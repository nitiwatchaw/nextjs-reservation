'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import useRegisterModal from '@/app/hook/useRegisterModal'
import useLoginModal from '@/app/hook/useLoginModal'
import Input from '../input/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import ImageProfile from '../input/ImageProfile'

enum STEPS {
    DATA = 0,
    IMG = 1,
}

const RegisterModal = () => {

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [showModal, setShowModal] = useState(registerModal.isOpen)
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(STEPS.DATA)


    useEffect(() => {
        setShowModal(registerModal.isOpen);
    }, [registerModal.isOpen]);

    const handleClose = useCallback(() => {


        setShowModal(false)

        setTimeout(() => {
            registerModal.onClose();
        }, 300)

    }, [registerModal.onClose])


    // เก็บข้อมูล input จาก id
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            imageProfile: ''
        }
    })

    if (!registerModal.isOpen) {
        return null;
    }



    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }


    const imageProfile = watch('imageProfile')


    //? funciton ในการ register user
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {

                registerModal.onClose()
                loginModal.onOpen()
                toast.success('Register Success ')
            })
            .catch((error) => {
                toast.error('user name/email is already used')
                console.error('Registration failed:', error);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }


    const toggle = () => {
        registerModal.onClose()
        loginModal.onOpen()
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }
    const onNext = () => {
        setStep((value) => value + 1)
    }

    let bodyContent = (
        <>
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
                    id="name"
                    label="Name"
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
            <div onClick={onNext} className="cursor-pointer underline text-sm text-neutral-700 text-right dark:text-[#cccdd8]">Add picture</div>
        </>
    )

    // step2
    if (step === STEPS.IMG) {
        bodyContent = (
            <>
                <ImageProfile value={imageProfile} onChange={((value) => setCustomValue('imageProfile', value))} />
                <div onClick={onBack} className="cursor-pointer underline text-sm text-neutral-700 text-right dark:text-[#cccdd8]">Back</div>
            </>
        )
    }



    return (
        <div className={`flex justify-center items-center overflow-x-hidden 
        overflow-y-auto fixed inset-0 outline-none  z-[9999] dark:bg-[#515574]/70 
        focus:outline-none bg-neutral-800/70`}>
            <div className={`
              ${showModal ? ' translate-y-0' : 'translate-y-full'}
              ${showModal ? ' opacity-100' : 'opacity-0'}
            bg-white relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 rounded-lg dark:bg-[#000f36]
        my-6 mx-auto  lg:h-auto md:h-auto z-50 translate transition duration-300 h-full`}>
                <div className="text-center relative text-lg flex items-center justify-center h-[80px]">
                    <button className='absolute left-10 text-2xl font-bold dark:text-[#888aa0]' onClick={handleClose}>x</button>
                    <div className="text-xl dark:text-white">Register</div>
                </div>
                <hr className='dark:border-[#71778e]'/>
                <div className="p-6 flex flex-col gap-4">
                    <div className="text-2xl font-bold dark:text-white">
                        Welcome to Posh Register
                    </div>
                    <div className="text-lg font-light dark:text-[#888aa0]" >
                        Create an account
                    </div>
                    {bodyContent}


                    <button
                        disabled={isLoading}
                        onClick={handleSubmit(onSubmit)}
                        className='disabled:bg-primary/70 disabled:cursor-wait  mt-1 w-full h-[50px] bg-primary text-white text-xl rounded-md'>Continue</button>
                    <hr className='dark:border-[#71778e]'/>
                    <div className="">
                        < div className="flex flex-col gap-4 mt-3" >
                            <hr className='dark:border-[#71778e]'/>
                            <button className='dark:bg-[#373c5f] dark:text-white flex items-center justify-between px-3 border border-black rounded-md h-[52px] hover:bg-neutral-100'>
                                <FcGoogle size={28} />
                                <div className="flex-1" onClick={() => signIn('google')}>Continue with Google</div>
                            </button>
                            <button className='dark:bg-[#373c5f] dark:text-white flex items-center justify-between px-3 border border-black rounded-md h-[52px] hover:bg-neutral-100'>
                                <AiFillGithub size={28} />
                                <div className="flex-1" onClick={() => signIn('github')} > Continue with Github</div>
                            </button>
                            <div className="text-neutral-500 text-center mt-4 font-light ">
                                <div className="flex items-center gap-2 justify-center ">
                                    <div className=""> Already have an account?</div>
                                    <div onClick={toggle}
                                        className="text-neutral-800 cursor-pointer hover:underline  dark:text-white"> Log in</div>
                                </div>
                            </div>
                        </ div>
                    </div>
                </div>

            </div >

        </div >
    )
}

export default RegisterModal