import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456789', 10),
        isAdmin: true
    },
    {
        name: 'Subash Pandey',
        email: 'subash@example.com',
        password: bcrypt.hashSync('123456789', 10)
    },
    {
        name: 'Tejesh Adhikari',
        email: 'tejesh@example.com',
        password: bcrypt.hashSync('123456789', 10)
    },
]

export default users