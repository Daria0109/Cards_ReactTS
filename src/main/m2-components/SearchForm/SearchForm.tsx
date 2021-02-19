import React, {ChangeEvent, useCallback, useState} from 'react';
import s from './SearchForm.module.css'
import debounce from 'lodash.debounce'

type SearchFormPropsType = {
  searchParam: string
  placeholder: string
  search: (value: string) => void
}

export const SearchForm: React.FC<SearchFormPropsType> = React.memo(({searchParam, placeholder, search}) => {
  const [searchValue, setSearchValue] = useState(searchParam)

  const debouncedSearch = useCallback(debounce((nextValue: string) => {
    search(nextValue)
  }, 1000), [])

  const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const nextSearchValue = e.currentTarget.value
    setSearchValue(nextSearchValue)
    debouncedSearch(nextSearchValue)
  }
  return <div>
    <input placeholder={placeholder}
           className={s.searchInput}
           value={searchValue}
           onChange={changeValueHandler}/>
  </div>
})