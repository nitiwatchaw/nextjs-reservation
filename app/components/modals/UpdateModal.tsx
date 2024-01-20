'use client'
import React, { useCallback, useState, useEffect, useMemo } from 'react'
import useUpdateModal from '@/app/hook/useUpdateModal'
import { useRouter } from 'next/navigation'
import { SafeUser, SafeListing } from '../types'
import Input from '../input/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import Header from '../Header'
import { categories } from '../navbar/Category'
import CategoryInput from '../input/CategoryInput'
import dynamic from 'next/dynamic'
import CountrySelect from '../input/CountrySelect'
import Counter from '../input/Counter'
import ImageUpload from '../input/ImageUpload'
import useCountries from '@/app/hook/useCountries'


interface UpdateModalProps {
    currentUser?: SafeUser | null;
    listing?: SafeListing;
}

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const UpdateModal: React.FC<UpdateModalProps> = ({ currentUser, listing }) => {


    const updateModal = useUpdateModal()
    const router = useRouter()
    const [showModal, setShowModal] = useState(updateModal.isOpen)
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(STEPS.CATEGORY)

    const { getByValue } = useCountries()


    const valueLocation = listing?.locationValue ? getByValue(listing.locationValue) : undefined;


    useEffect(() => {
        setShowModal(updateModal.isOpen);
    }, [updateModal.isOpen]);

    const handleClose = useCallback(() => {

        setShowModal(false)

        setTimeout(() => {
            updateModal.onClose();
            setStep(STEPS.CATEGORY)
        }, 300)

    }, [updateModal.onClose])


    const onBack = () => {
        setStep((value) => value - 1)
    }
    const onNext = () => {
        setStep((value) => value + 1)
    }


    const { register, handleSubmit, setValue, watch, formState: { errors, }, reset } = useForm<FieldValues>({
        defaultValues: {
            category: listing?.category,
            location: valueLocation,
            guestCount: listing?.guestCount,
            roomCount: listing?.roomCount,
            bathroomCount: listing?.bathroomCount,
            imageSrc: listing?.imageSrc,
            price: listing?.price,
            description: listing?.description,
            title: listing?.title,

        }
    })

    //* ตัวแสดงผล
    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')


    // *ใช้เพื่อ update value ของ 'category' , 'location' field เมื่อทำการ interact with input ต่างๆ
    // คล้ายกับๆสร้าง state เพื่อเก็บข้อมูลนั้นเอง
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.put(`/api/listings/${listing?.id}`, data)
            .then(() => {
                toast.success('Property Update')
                router.refresh()
                // reset when submit
                reset()
                setStep(STEPS.CATEGORY)
                updateModal.onClose()
            })
            .catch(() => {
                toast.error('Some input is empty')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    // import Map แบบ dynamic
    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])


    // step1

    let bodyContent = (
        <>
            <div>
                <Header
                    desc='Pick a category'
                    title='Which of these best describes your place' />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto mt-6">
                    {categories.map((item) => (
                        <div key={item.label} className='col-span-1'>
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={onNext}
                    className='mt-10 w-full h-[50px] bg-primary text-white text-xl rounded-md'>Next</button>
            </div>
        </>
    )


    // step2
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Header
                    title='Where is your place located?'
                    desc='Help guests find you'
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
                <div className="flex gap-5">
                    <button onClick={onBack}
                        className='mt-10 w-full h-[50px] bg-white text-primary border-2 border-primary text-xl rounded-md'>Back</button>
                    <button onClick={onNext}
                        className='mt-10 w-full h-[50px] bg-primary text-white text-xl rounded-md'>Next</button>
                </div>
            </div>
        )
    }
    // step3
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Header
                    title='Share some basics about your place'
                    desc='What amenities do you have?'

                />
                <Counter
                    title='Guests'
                    subtitle='How many guests do yoy allow?'
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr className='dark:border-[#71778e]'/>
                <Counter
                    title='Rooms'
                    subtitle='How many rooms do you have?'
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr className='dark:border-[#71778e]'/>
                <Counter
                    title='Bathrooms'
                    subtitle='How many bathrooms do you have?'
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
                <div className="flex gap-5">
                    <button onClick={onBack}
                        className='mt-10 w-full h-[50px] bg-white text-primary border-2 border-primary text-xl rounded-md'>Back</button>
                    <button onClick={onNext}
                        className='mt-10 w-full h-[50px] bg-primary text-white text-xl rounded-md'>Next</button>
                </div>
            </div>
        )
    }

    // step4
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Header
                    title='Add a photo of your place'
                    desc='Show guests what your place looks like!'
                />
                <ImageUpload value={imageSrc} onChange={((value) => setCustomValue('imageSrc', value))} />
                <div className="flex gap-5">
                    <button onClick={onBack}
                        className='mt-10 w-full h-[50px] bg-white text-primary border-2 border-primary text-xl rounded-md'>Back</button>
                    <button onClick={onNext}
                        className='mt-10 w-full h-[50px] bg-primary text-white text-xl rounded-md'>Next</button>
                </div>
            </div>
        )
    }

    // step5
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Header
                    title='How would you describe your place?'
                    desc='Short and sweet works best!'
                />
                <Input
                    id='title'
                    label='Title'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr className='dark:border-[#71778e]'/>
                <Input
                    id='description'
                    label='Description'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <div className="flex gap-5">
                    <button onClick={onBack}
                        className='mt-10 w-full h-[50px] bg-white text-primary border-2 border-primary text-xl rounded-md'>Back</button>
                    <button onClick={onNext}
                        className='mt-10 w-full h-[50px] bg-primary text-white text-xl rounded-md'>Next</button>
                </div>
            </div>
        )
    }


    // step6
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Header
                    title='Now, set your price'
                    desc='How much do you charge per night?'
                />
                <Input
                    id='price'
                    label='Price'
                    formatPrice
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <div className="flex gap-5">
                    <button onClick={onBack}
                        className='mt-10 w-full h-[50px] bg-white text-primary border-2 border-primary text-xl rounded-md'>Back</button>
                    <button disabled={isLoading} onClick={handleSubmit(onSubmit)}
                        className='mt-10 w-full h-[50px] bg-primary text-white text-xl rounded-md disabled:bg-primary/70 disabled:cursor-wait'>Create</button>
                </div>

            </div>
        )
    }



    if (!updateModal.isOpen) {
        return null;
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
                    <div className="text-xl">Update Property</div>
                </div>
                <hr className='dark:border-[#71778e]'/>
                <div className="p-6 flex flex-col gap-4">
                    <div className="text-2xl font-bold ">
                        Let us know how your property is go far
                    </div>
                    {bodyContent}

                </div>


            </div>

        </div>
    )
}

export default UpdateModal