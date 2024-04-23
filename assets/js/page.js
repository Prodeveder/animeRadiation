const GetLocalStorageItem = (data) => {
    const result = localStorage.getItem(data);
    return result;
};  
let id = document.querySelector('.id');

id.innerHTML = GetLocalStorageItem('anime_id');


console.log(GetLocalStorageItem('anime_id'));