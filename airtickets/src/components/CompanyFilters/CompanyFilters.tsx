import React, { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelectedCompanies } from '../../store/slices/filterSlices';
import '../Sidebar/Sidebar.scss';

interface Ticket {
    company: string;
}

interface CompanyFiltersProps {
    className?: string;
}

const CompanyFilters: React.FC<CompanyFiltersProps> = ({ className }) => {
    const dispatch = useDispatch();
    const selectedCompanies = useSelector((state: RootState) => state.filters.selectedCompanies);
    const { tickets } = useSelector((state: RootState) => state.tickets) as { tickets: Ticket[] };

    const classToUse = className || 'company';
    const uniqueCompanies = Array.from(new Set(tickets.map((ticket: Ticket) => ticket.company)));

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        const updatedSelectedCompanies = checked
            ? [...selectedCompanies, name]
            : selectedCompanies.filter((company: string) => company !== name);

        dispatch(setSelectedCompanies(updatedSelectedCompanies));
    };

    return (
        <div className={classToUse}>
            <h3 className="sidebar__title">Компании</h3>
            {uniqueCompanies.map((name: string, index: number) => (
                <label key={index} className="checkbox__wrapper">
                    <input
                        className="checkbox-radio"
                        type="checkbox"
                        name={name}
                        checked={selectedCompanies.includes(name)}
                        onChange={handleCheckboxChange}
                    />
                    <span className="checkbox__name">{name}</span>
                </label>
            ))}
        </div>
    );
};

export default CompanyFilters;
