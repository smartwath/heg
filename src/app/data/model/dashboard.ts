export interface Dashboard {
    userId: string,
    userName: string,
    userPass: string,
    status: string,
    createdAt: Date,
    otp: {
        otpId: string,
        otp: string
        status: string
    }
}
