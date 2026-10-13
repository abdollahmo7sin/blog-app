import { useMutation } from "@tanstack/react-query"
import { register as registerService, login as loginService } from "../services/auth"
import type { RegisterSchema, LoginSchema } from "../schemas/authSchemas"

export const useRegister = () => {
    const register = useMutation({
        mutationFn: ({ email, password, username, displayName }: RegisterSchema) =>
            registerService({ email, password, username, display_name: displayName })
    })

    return register
}

export const useLogin = () => {
    const login = useMutation({
        mutationFn: ({ email, password }: LoginSchema) =>
            loginService({ email, password })
    })

    return login
}