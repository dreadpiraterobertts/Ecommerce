import React, { useState , useEffect} from 'react';
import './AddBanner.css';
import upload_area from '../../assets/upload_area.svg';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const AddBanner = () => {

    const [banners, setBanners] = useState([]);
    const [editBannerId, setEditBannerId] = useState(null);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await fetch(`${backendUrl}/banners`);
            const data = await response.json();
            if (data.success) {
                setBanners(data.banners);
            } else {
                alert('Failed to fetch banners');
            }
        } catch (error) {
            console.error('Error fetching banners:', error);
            alert('An error occurred while fetching banners');
        }
    };

   

    const removeBanner = async (id) => {
        try {
            const response = await fetch(`${backendUrl}/delbanner`, {
                method: 'POST',
                headers:{
                    id:id,
                },
            });
            const data = await response.json();
            if (data.success) {
                alert('Banner deleted successfully');
                fetchBanners();
            } else {
                alert('Failed to delete banner');
            }
        } catch (error) {
            console.error('Error deleting banner:', error);
            alert('An error occurred while deleting banner');
        }
    };

    const [image, setImage] = useState(false);
    const [bannerDetails, setBannerDetails] = useState({
        category: "exclusive offers",
        image: "",
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setBannerDetails({ ...bannerDetails, [e.target.name]: e.target.value });
    };

    const Add_Banner = async () => {
        console.log(bannerDetails);
        let responseData;
        let banner = bannerDetails;

        let formData = new FormData();
        formData.append('banner', image);

        await fetch(`${backendUrl}/upload/banner`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => { responseData = data });

        if (responseData.success) {
            banner.image = responseData.image_url;
            console.log(banner);
            await fetch(`${backendUrl}/addbanner`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(banner),
            }).then((resp) => resp.json()).then((data) => {
                data.success === 1 ? alert("Banner Added") : alert("Failed");
                fetchBanners()
            });
        }
    };

    return (
        <>
        <div className='addbanner'>
            <div className="addbanner-itemfield">
                <p>Banner Category</p>
                <select value={bannerDetails.category} onChange={changeHandler} name="category" className='addbanner-selector'>
                    <option value="exclusive offers">Exclusive Offers</option>
                    <option value="sale offer">Sale Offer</option>
                </select>
            </div>
            <div className="addbanner-itemfield">
                <label htmlFor="file-input-banner">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className="addbanner-thumbnail-img" alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input-banner' hidden />
            </div>
            <button onClick={() => { Add_Banner() }} className='addbanner-btn'>Add Banner</button>
        </div>
         <div className="banner-list">
         <h2>Banners</h2>
       
         <ul>
             {banners.map(banner => (
                 <li key={banner._id}>
                     <img src={banner.imageUrl} alt={banner.category} className="banner-image" />
                     <span>{banner.category}</span>
                    
                    <button onClick={() => removeBanner(banner._id)} className="remove-button">Remove</button>
                              
                 </li>
             ))}

         </ul>
         {banners.length >= 2 ? (
            <p>You cannot add more than 2 banners.</p>):(<></>)}
     </div>
        </>
    );
};

export default AddBanner;
