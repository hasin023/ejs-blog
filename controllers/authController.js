const formidable = require('formidable');

class AuthController {
    registerPage = (req, res) => {
        return res.render('dashboard/register.ejs', {
            title: 'Register',
            user: {}
        });
    }

    registerUser = async (req, res) => {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {

            const { email, password } = fields;
            const { image } = files;

            const user = {};

            if (email) {
                user.email = email;
            }

            if (password) {
                user.password = password;
            }

            if (image) {
                user.image = image;
                // console.log(files.image[0].filepath);
                // console.log(files.image[0].newFilename);
                // console.log(files.image[0].originalFilename);
            }

            console.log(user);

            return res.render('dashboard/register.ejs', {
                title: 'Register',
                user
            });

        });

    }
}

module.exports = new AuthController();