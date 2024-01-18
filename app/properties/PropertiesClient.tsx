'use client'
import React, { useCallback } from 'react'
import { SafeListing, SafeUser } from '../components/types';
import Header from '../components/Header';
import ListingCard from '../components/listings/ListingCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';



interface PropertiesProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null
  allUser?: any
}

const PropertiesClient: React.FC<PropertiesProps> = ({ listings, currentUser, allUser }) => {

  const router = useRouter();


  const onCancel = useCallback((id: string) => {


    const isConfirmed = window.confirm('Are you sure you want to delete this listing?');

    if (!isConfirmed) {
      return; // Do nothing if the user cancels the deletion
    }

    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Listing deleted')
        router.refresh()
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })

  }, [router])





  return (
    <>
      <div className="">
        <Header
          title='Properties'
          desc="List of your properties"
        />
      </div>
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            allUser={allUser}
            currentUser={currentUser}
            deletebtn
            updatebtn
            onAction={() => onCancel(listing.id)}
          />
        ))}
      </div>


    </>
  )
}

export default PropertiesClient