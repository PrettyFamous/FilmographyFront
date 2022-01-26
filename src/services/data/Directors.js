export const Directors = () => 
[
    {
        fullName: "Иванов Иван Иванович",
        birthDate: "12.12.1990",
        country: "Россия"
    },
    {
        fullName: "Петров Иван Иванович",
        birthDate: "10.10.1910",
        country: "Лилипутия"
    },
    {
        fullName: "Понасенков Олег Радионович",
        birthDate: "15.02.1999",
        country: "Германия"
    }  
].map((item,index) => ({
    id: index+1,
    ...item
}))
