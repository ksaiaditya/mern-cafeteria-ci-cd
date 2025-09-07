import { useEffect, useState } from "react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "" });

    // Fetch users from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            const newUser = await res.json();
            setUsers([...users, newUser]); // update UI
            setForm({ name: "", email: "" }); // reset form
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4 text-blue-600">Users</h1>

            {/* Add User Form */}
            <form onSubmit={handleSubmit} className="mb-6 space-x-2">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add
                </button>
            </form>

            {/* Users List */}
            <ul className="space-y-2">
                {users.map((user) => (
                    <ul className="space-y-2">
                        {users.map((user) => (
                            <li key={user._id} className="bg-white p-4 rounded shadow">
                                {user._id === form._id ? (
                                    // --- EDIT MODE ---
                                    <form
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
                                                method: "PUT",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ name: form.name, email: form.email }),
                                            });
                                            if (res.ok) {
                                                const updatedUser = await res.json();
                                                setUsers(users.map((u) => (u._id === user._id ? updatedUser : u)));
                                                setForm({ name: "", email: "", _id: null });
                                            }
                                        }}
                                        className="flex space-x-2"
                                    >
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className="border p-2 rounded"
                                            required
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="border p-2 rounded"
                                            required
                                        />
                                        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
                                            Save
                                        </button>
                                    </form>
                                ) : (
                                    // --- NORMAL VIEW ---
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-gray-500">{user.email}</p>
                                        </div>
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => setForm({ name: user.name, email: user.email, _id: user._id })}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    await fetch(`http://localhost:5000/api/users/${user._id}`, {
                                                        method: "DELETE",
                                                    });
                                                    setUsers(users.filter((u) => u._id !== user._id));
                                                }}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>



                ))}

            </ul>
        </div>
    );
}
