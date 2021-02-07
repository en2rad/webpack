export let select = document.createElement('select');
select.setAttribute('class', 'form__select');

 const getUserData = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(user => user.forEach(user => {
            setUsername(user.username) 
        })) 
}
getUserData()

function setUsername(name) {
    let option = document.createElement('option');
    option.append(name);
    select.append(option);
}
