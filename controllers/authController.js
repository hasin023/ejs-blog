class AuthController {
    registerPage = (req, res) => {
        return res.render('dashboard/register.ejs', {
            title: 'Register'
        });
    }
}

module.exports = new AuthController();