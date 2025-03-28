export async function getDefaultContacts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    return data.map((user) => {
        const nameParts = user.name.split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts[1];

        return {
            id: user.id,
            firstName: firstName,
            lastName: lastName,
            phone: user.phone,
        };
    });
}
