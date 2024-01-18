'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import useRegisterModal from '@/app/hook/useRegisterModal'
import useLoginModal from '@/app/hook/useLoginModal'
import Input from '../input/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

const LoginModal = () => {

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [showModal, setShowModal] = useState(loginModal.isOpen)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setShowModal(loginModal.isOpen);
    }, [loginModal.isOpen]);

    const handleClose = useCallback(() => {

        setShowModal(false)

        setTimeout(() => {
            loginModal.onClose();
        }, 300)

    }, [loginModal.onClose])


    // เก็บข้อมูล input จาก id
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    if (!loginModal.isOpen) {
        return null;
    }

    //? funciton ในการ login user
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false)
            if (callback && callback.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }
            if (callback && callback.error) {
                toast.error(callback.error);
            }


        })
    }

    const toggle = () => {
        loginModal.onClose()
        registerModal.onOpen()
    }


    return (
        <div className={`flex justify-center items-center overflow-x-hidden 
        overflow-y-auto fixed inset-0 outline-none  z-[9999]
        focus:outline-none bg-neutral-800/70`}>
            <div className={`
              ${showModal ? ' translate-y-0' : 'translate-y-full'}
              ${showModal ? ' opacity-100' : 'opacity-0'}
            bg-white relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 rounded-lg
        my-6 mx-auto  lg:h-auto md:h-auto z-50 translate transition duration-300 h-full`}>
                <div className="text-center relative text-lg flex items-center justify-center h-[80px]">
                    <button className='absolute left-10 text-2xl font-bold' onClick={handleClose}>x</button>
                    <div className="text-xl">Login</div>
                </div>
                <hr />
                <div className="p-6 flex flex-col gap-4">
                    <div className="text-2xl font-bold ">
                        Welcome back to Posh Website
                    </div>
                    <div className="text-lg font-light">
                        Login account
                    </div>
                    <div className="flex flex-col gap-4">
                        <Input
                            id="email"
                            label="Email"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>


                    <button
                        onClick={handleSubmit(onSubmit)}
                        className='mt-10 w-full h-[50px] bg-primary text-white text-xl rounded-md'>Continue</button>
                    <hr />
                    <div className="">
                        < div className="flex flex-col gap-4 mt-3" >
                            <hr />
                            <button className='flex items-center justify-between px-3 border border-black rounded-md h-[52px] hover:bg-neutral-100'>
                                <FcGoogle size={28} />
                                <div className="flex-1" onClick={() => signIn('google')}>Continue with Google</div>
                            </button>
                            <button className='flex items-center justify-between px-3 border border-black rounded-md h-[52px] hover:bg-neutral-100'>
                                <AiFillGithub size={28} />
                                <div className="flex-1" onClick={() => signIn('github')}>Continue with Github</div>
                            </button>
                            <div className="text-neutral-500 text-center mt-4 font-light ">
                                <div className="flex items-center gap-2 justify-center ">
                                    <div className=""> First time coming?</div>
                                    <div
                                        onClick={toggle}
                                        className="text-neutral-800 cursor-pointer hover:underline"> Register</div>
                                </div>
                            </div>
                        </ div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default LoginModal