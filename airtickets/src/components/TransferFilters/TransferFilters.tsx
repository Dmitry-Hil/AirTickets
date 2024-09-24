import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTransfers } from '../../store/slices/filterSlices'
import { RootState } from '../../store/store'
import '../Sidebar/Sidebar.scss'

interface TransferFiltersProps {
    className?: string
}

type checkbox = {
    id: number,
    name: string
}

const checkboxes: checkbox[] = [
    { id: 0, name: 'Без пересадок' },
    { id: 1, name: '1 пересадка' },
    { id: 2, name: '2 пересадки' },
    { id: 3, name: '3 пересадки' },
]

const TransferFilters: React.FC<TransferFiltersProps> = ({ className }) => {
    const classToUse = className || 'transfers'

    const dispatch = useDispatch()
    const selectedTransfers = useSelector((state: RootState) => state.filters.selectedTransfers)

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target
        const transferNumber = parseInt(name.replace('transfer', ''), 10)
        let newSelectedTransfers = [...selectedTransfers]

        if (checked) {
            newSelectedTransfers.push(transferNumber)
        } else {
            newSelectedTransfers = newSelectedTransfers.filter((transfer) => transfer !== transferNumber)
        }

        dispatch(setSelectedTransfers(newSelectedTransfers))
    }

    return (
        <div className={classToUse}>
            <h3 className="sidebar__title">Количество пересадок</h3>
            {checkboxes.map((checkbox) => (
                <label className="checkbox__wrapper" key={checkbox.id}>
                    <input
                        className="checkbox"
                        type="checkbox"
                        name={`transfer${checkbox.id}`}
                        checked={selectedTransfers.includes(checkbox.id)}
                        onChange={handleCheckboxChange}
                    />
                    <span className="checkbox__name">{checkbox.name}</span>
                </label>
            ))}
        </div>
    )
}

export default TransferFilters 
