import { useEffect, useState } from 'react';
import { fetchTickets } from '../../store/slices/tickets';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import './MainBlock.scss';
import CompanyFilters from '../CompanyFilters/CompanyFilters';
import TransferFilters from '../TransferFilters/TransferFilters';
import TicketsLoader from '../Utils/TicketsLoader';
import { Ticket as TicketType } from '../../types/types';


const MainBlock = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [displayedTickets, setDisplayedTickets] = useState(4);
    const [filter, setFilter] = useState<'cheapest' | 'fastest' | 'optimal'>('cheapest');

    const dispatch = useAppDispatch();
    const { tickets, error, status } = useAppSelector((state: RootState) => state.tickets);
    const { selectedCompanies, selectedTransfers } = useAppSelector((state: RootState) => state.filters);

    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    const calculateFlightDuration = (startTime: string, endTime: string) => {
        const start = new Date(`2022-01-01T${startTime}:00Z`);
        let end = new Date(`2022-01-01T${endTime}:00Z`);
        if (end <= start) {
            end.setDate(end.getDate() + 1);
        }

        const duration = end.getTime() - start.getTime();
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        return `${hours} ч ${minutes} мин`;
    };

    const handleLoadMoreTickets = () => {
        setDisplayedTickets((prev) => Math.min(prev + 4, filteredTickets.length));
    };

    const filteredTickets = tickets.filter((ticket: TicketType) => {
        return selectedCompanies.includes(ticket.company) && 
               (selectedTransfers.length === 0 || selectedTransfers.includes(ticket.connectionAmount ?? 0));
    });
 
    filteredTickets.sort((a: TicketType, b: TicketType) => {
        if (filter === 'cheapest') {
            return a.price - b.price;
        } else if (filter === 'fastest') {
            return a.duration - b.duration;
        } else if (filter === 'optimal') {
            return (a.price / a.duration) - (b.price / b.duration);
        }
        return 0;
    });

    return (
        <div>
            <div className="btn__wrapper">
                {['cheapest', 'fastest', 'optimal'].map((filterType) => (
                    <div
                        key={filterType}
                        className={`filter__btn ${filter === filterType ? 'active' : ''}`}
                        onClick={() => setFilter(filterType as typeof filter)}
                    >
                        {filterType === 'cheapest' && 'Самый дешевый'}
                        {filterType === 'fastest' && 'Самый быстрый'}
                        {filterType === 'optimal' && 'Самый оптимальный'}
                    </div>
                ))}
            </div>
            <div className="filter__wrapper">
                <div className="filter__menu">
                    <div className="filter__lists">
                        <div className="filter__list">
                            <span className="filter__item">Любая авиакомпания </span>
                            <span className="filter__item"> любое кол-во пересадок</span>
                        </div>
                        <div className="filter__list">
                            <span className="filter__item">{isOpen ? 'Закрыть настройки' : 'Открыть настройки'} </span>
                            <img 
                                onClick={() => setIsOpen(prev => !prev)} 
                                className='arrow__btn' 
                                style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} 
                                src='/arrow.svg' 
                                alt='arrow' 
                            />
                        </div>
                    </div>
                    {isOpen && (
                        <div className='tablet__wrapper'>
                            <CompanyFilters className="tablet" />
                            <TransferFilters className="tablet" />
                        </div>
                    )}
                </div>
            </div>
            <div className="result__wrapper">
                {status === 'loading' && (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {[...Array(4)].map((_, i) => <TicketsLoader key={i} />)}
                    </div>
                )}
                {status === 'error' && <p>Error: {error}</p>}
                {status === 'success' &&
       filteredTickets.slice(0, displayedTickets).map((ticket: TicketType) => {
                        const formattedStartTime = ticket.time.startTime.padStart(5, '0').slice(0, 5);
                        const formattedEndTime = ticket.time.endTime.padStart(5, '0').slice(0, 5);
                        return (
                            <div className="result__item" key={ticket.id}>
                                <div className="title__wrapper">
                                    <div className="result__price">{ticket.price} {ticket.currency}</div>
                                    <img className="result__logo" src={`${ticket.company}.svg`} alt="air-company" />
                                </div>
                                <div className="details__wrapper">
                                    <div className="location">
                                        <div className="from-to__wrapper">
                                            <span className="from">{ticket.from} </span>
                                            <span className="dash">-</span>
                                            <span className="to">{ticket.to}</span>
                                        </div>
                                        <div className="from-time__wrapper">
                                            <span className="from-time">{formattedStartTime}</span>
                                            <span className="dash-active">-</span>
                                            <span className="from-to"> {formattedEndTime}</span>
                                        </div>
                                    </div>
                                    <div className="on-way">
                                        <span className="on-way__title">В пути</span>
                                        <span className="on-way__time">
                                            {calculateFlightDuration(formattedStartTime, formattedEndTime)}
                                        </span>
                                    </div>
                                    <div className="result__transfers">
                                        <span className="transfers__title">Пересадки</span>
                                        <span className="transfers__desc">
                                            {ticket.connectionAmount === 0 ? 'Без пересадок' : 
                                             ticket.connectionAmount === 1 ? '1 пересадка' : 
                                             `${ticket.connectionAmount} пересадок`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <button 
                onClick={handleLoadMoreTickets} 
                className={displayedTickets >= filteredTickets.length ? "btn__more disabled" : "btn__more"}
            >
                Загрузить еще билеты
            </button>
        </div>
    );
};

export default MainBlock;