export const withoutPassword = (data) => {
    const { password, ...withoutPassword } = data;
    return withoutPassword;
};
