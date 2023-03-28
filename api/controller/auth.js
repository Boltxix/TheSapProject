import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

    //CHECK EXISTING USER
    const q = "SELECT * FROM user WHERE email = ? OR username = ?"

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User already exists!")

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO user (`username`, `role`, `email` , `password`, `subject`, `year`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.role,
            req.body.email,
            req.body.password,
            //hash,
            req.body.subject,
            req.body.year
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created.")
        })
    })

}
export const login = (req, res) => {
    //CHECK USER EXISTS
    const q = "SELECT * FROM user WHERE username = ? "
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not Found!");

        //CHECK PASSWORD (to secure use bcrypt.compareSync)
        const isPasswordCorrect = (req.body.password, data[0].password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!")

        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        const { password, ...other } = data[0]

        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json(other)
    });
}
export const logout = (req, res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200)
    .json("User has been Logged Out!")
};