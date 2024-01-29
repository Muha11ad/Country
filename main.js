"use strict"
// -----LINKING start -----
let search = $("#search")
let region = $("#region")
let wrapper = $(".wrapper")
const BASE_URL = "https://restcountries.com/v2";
// -----LINKING end -----

// -----FETCHS start-----
async function allCountries(){
    wrapper.innerHTML = `<span class="loader"></span>`
    try{
    const response = await fetch(`${BASE_URL}/all`)
    const result = await response.json()
        if(response.status === 200){
            renderCountries(result)
            optionsRender(result)
        } else{
            wrapper.innerHTML = '<h1 class"text-red text-center">COUNTRIES NOT FOUND</h1>'
        }
    } catch(err){
        console.log(err)
    }
}
allCountries()
async function getRegion(e){
    wrapper.innerHTML = `<span class="loader"></span>`
    try{
    const response = await fetch(`${BASE_URL}/region/${e.target.value}`)
    const result = await response.json()
            renderCountries(result)

    } catch(err){
        console.log(err)
    }
}

async function getName(e){
    wrapper.innerHTML = `<span class="loader"></span>`
    try{
    const response = await fetch(`${BASE_URL}/name/${e}`)
    const result = await response.json()
    if(response.status === 200){
    renderCountries(result)
    } else{
        wrapper.innerHTML = '<h1 class"text-red text-center">COUNTRIES NOT FOUND</h1>'
        setTimeout(()=>{
            window.location.reload()
            search.value =''
        },1111)
    }

    } catch(err){
        console.log(err)
    }
}
// -----FETCHS end-----

// -----RENDERS start-----
function renderCountries(data){   

    if(data){
        wrapper.innerHTML ='';
        data.forEach(country => {
            console.log(country)
            const card = createElement("div",
            "card w-[267px] h-[366px] overflow-hidden shadow-xl cursor-pointer hover:scale-105 duration-700 ease-in",
            `
            <img src="${country.flag}" alt="" class="w-full h-[190px]">
                    <div class="card__body p-4">
                        <h3 class="text-xl font-bold"> ${country.name}</h3>
                    <ul class="mt-2">
                        <li><strong>Population:</strong> ${country.population}</li>
                        <li><strong>Region:</strong> ${country.region}</li>
                        <li><strong>Capital:</strong> ${country.capital}</li>
                    </ul>
                    </div>
            `)
            wrapper.append(card)
       });
    }
}

function optionsRender (data){
    const option = [];
    data?.forEach(country=>{
        if(!option.includes(country.region)){
            option.push(country.region)
        }
    })
    option?.forEach((item)=>{
        const regionOption = createElement('option','option',item)
        region.append(regionOption)
    })
}
// -----RENDERS end-----

// -----AddEventListeners start-----
region.addEventListener("change", (e)=>{
    getRegion(e)
})

search.addEventListener('keyup',(e)=>{
    getName(e.target.value)
})
// -----AddEventListeners end-----
