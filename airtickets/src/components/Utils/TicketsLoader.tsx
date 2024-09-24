import ContentLoader from 'react-content-loader'

const TicketsLoader = () => {
    return (
        <ContentLoader style={{ marginBottom: '20px' }}
            speed={2}
            width={520}
            height={170}
            viewBox="0 0 420 170"
            backgroundColor="#e8ebf2"
            foregroundColor="#4e288c"
        >
            <rect x="122" y="100" rx="0" ry="0" width="1" height="0" />
            <rect x="30" y="2" rx="17" ry="17" width="383" height="162" />
            <rect x="382" y="44" rx="0" ry="0" width="2" height="0" />
            <rect x="394" y="176" rx="0" ry="0" width="10" height="1" />
            <rect x="400" y="27" rx="0" ry="0" width="5" height="0" />
        </ContentLoader>
    )
}

export default TicketsLoader