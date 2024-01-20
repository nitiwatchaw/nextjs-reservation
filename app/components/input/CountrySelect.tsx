import useCountries from '@/app/hook/useCountries';
import React from 'react'
import Select from 'react-select'

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[],
  region: string;
  value: string
}

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}


const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {

  const { getAll } = useCountries()

  return (
    <div>
      <Select

        placeholder='Anywhere'
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className='flex items-center gap-3 '>
            <div className="">{option.flag}</div>
            <div className="">
              {option.label},
              <span className='text-neutral-500 ml-1'>
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2 dark:bg-[#1d254a] dark:border-[#1d254a]',
          input: () => 'text-lg dark:text-white',
          option: () => 'text-lg dark:bg-[#1d254a] ',
          menu: () => 'dark:text-white',
          menuList: () => 'dark:bg-[#1d254a]',
          singleValue: () => 'dark:text-white'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black ',
            primary25: '#ffe4e6',
            primary75:'white'
          }
        })}
      />
    </div>
  )
}

export default CountrySelect