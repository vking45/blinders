import banner from '../../styles/banner.jpeg';

const BannerContainer = () => {
    return (
        <div className="flex justify-center justify-self-center items-center w-10/12 h-80 m-2 rounded-lg bg-gray-700 mt-12 mb-16">
            <img src={banner} />
        </div>
    );
}

export default BannerContainer;