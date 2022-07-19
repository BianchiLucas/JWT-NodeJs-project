const login = async (req, res) => {
    res.send('Fake login/register/SignUp Route')
};

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status().json({ msg: `Hello User`, secret: `Here is your lucky number: ${luckyNumber}` })
};

module.exports = { login, dashboard }