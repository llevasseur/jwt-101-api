import bcrypt from "bcrypt";
export async function hashPassword(plainPassword) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}
export async function verifyPassword(inputPassword, storedHash) {
    const match = await bcrypt.compare(inputPassword, storedHash);
    return match;
}
//# sourceMappingURL=hash-password.js.map