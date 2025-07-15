import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
    }
}

export const passwordCompare = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
        console.log(error);
    }
}