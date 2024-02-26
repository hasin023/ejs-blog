const formidable = require('formidable');
const pool = require('../config/db');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const saltRounds = 10;


class AuthController {
    registerPage = (req, res) => {
        return res.render('dashboard/register.ejs', {
            title: 'Register',
            error: ''
        });
    }

    registerUser = async (req, res) => {
        const form = new formidable.IncomingForm();

        try {
            const { fields, files } = await new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ fields, files });
                    }
                });
            });

            const { email, password } = fields;
            const { image } = files;
            const stringPassword = String(password);

            const hashedPassword = await bcrypt.hash(stringPassword, saltRounds);
            let imageNewName = Date.now() + image[0].originalFilename;

            const emailCheckQuery = `SELECT COUNT(*) AS count FROM users WHERE email = '${email}'`;
            const emailExistsResult = await pool.query(emailCheckQuery);
            const emailExists = emailExistsResult.rows[0].count > 0;

            if (emailExists) {
                return res.status(400).render('dashboard/register', {
                    title: 'Register',
                    error: 'Email already exists'
                });
            }

            const insertQuery = `INSERT INTO users (email, password, img_url) VALUES ('${email}', '${hashedPassword}', '${imageNewName}')`;
            await pool.query(insertQuery);

            const disPath = `${__dirname}/../views/assets/images/${imageNewName}`;
            await fs.copyFile(image[0].filepath, disPath);

            return res.status(200).redirect('/login');

        } catch (error) {
            return res.status(500).render('dashboard/error.ejs', {
                title: 'Error',
                message: 'Internal server error',
                error: error
            });
        }

    };



}

module.exports = new AuthController();