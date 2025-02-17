import Layout from "../../../components/layout";
import Link from "next/link";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getPostulant from "../../../lib/getPostulant";
import axios from "axios";


function Details({usuario,profile}) {

    let randomProfiles = [];
    profile = JSON.parse(profile);
    const result = async () => {
        const data = await axios.get('/api/me');
        const user = data.data.data.responseBd;
        
        return await axios.post("/api/addMod", {
            idPostulant: profile.idPostulant,
            dateMod: new Date(),
            context: user.mailUser,
            request: user.nameUser,
            requestedInfo: "Informacion solicitada del postulante: "+profile.namePostulant+" "+profile.lastName,
            idUserSystem: user.idUser
        })        
}
//pickeando perfiles randoms con mismas caracteristicas
    const request = async () => {  

        try {
            const res = await result();  
            
            if(res.status === 200){
                    toast.success("Se ha solicitado correctamente la Información de " + profile.namePostulant + " " + profile.lastName + ".", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        theme: "dark",
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    });
            }
            
        }
         catch (error) {       
            toast.error(error.response.data.err, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                theme: "dark",
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }


        
        
    }
    return (
        <Layout>
            <Link href='/advanced/profiles/'>
                <svg xmlns="http://www.w3.org/2000/svg" className="m-3 cursor-pointer icon icon-tabler icon-tabler-arrow-left" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <line x1="5" y1="12" x2="11" y2="18" />
                    <line x1="5" y1="12" x2="11" y2="6" />
                </svg>
            </Link>
            <div className="flex items-center justify-center">
                <div className="items-center md:flex space-x-7">
                    <img src={`data:image/jpeg;base64,${profile.photoPostulant}`} alt={profile.name} className="mx-auto rounded-full ml-2 md:h-96" />
                    <div className="space-y-5">
                        <h1 className="text-3xl font-bold text-green-900">{profile.namePostulant +" " +profile.lastName}</h1>
                        <div className="md:grid grid-cols-3 block mr-[1rem] md:mx-0">
                            <div className="nested-container">
                                <h1 className="text-xl"> 
                                    <b className="nested-title">Area de Interés:</b>                                                                         
                                </h1>
                                <span className="nested-camp">
                                        {profile.workSubjects.WorkSubject}
                                </span>
                            </div>
                            <div className="nested-container">
                                <h1 className="text-xl"> 
                                    <b className="nested-title">Tipo de Contrato:</b>                                
                                </h1>                            
                                <span className="nested-camp">
                                        {profile.ContractType_ContractTypeToPostulants.WType}
                                </span>
                            </div>
                            <div className="nested-container">
                                <h1 className="text-xl"> 
                                    <b className="nested-title">Estudios Básicos:</b>                                
                                </h1>                            
                                <span className="nested-camp">
                                        {profile.HighType_HighTypeToPostulants.HighType}
                                </span>
                            </div>
                            <div className="nested-container">
                                <h1 className="text-xl"> 
                                    <b className="nested-title">Expectativa Salarial:</b>                                
                                </h1>                            
                                <span className="nested-camp">
                                        {profile.SalaryState.Salary}
                                </span>
                            </div>
                            <div className="nested-container">
                                <h1 className="text-xl"> 
                                    <b className="nested-title">Trabajo Deseado:</b>                                
                                </h1>                            
                                <span className="nested-camp">
                                        {profile.WorkPreference_PostulantsToWorkPreference.WPreference}
                                </span>
                            </div>
                            <div className="nested-container">
                                <h1 className="text-xl"> 
                                    <b className="nested-title">Situación :</b>                                
                                </h1>                            
                                <span className="nested-camp">
                                        {profile.WorkState.WorkState}
                                </span>
                            </div>
                            <div className="nested-container">
                                <h1 className="text-xl"> 
                                    <b className="nested-title">Ubicación :</b>                                
                                </h1>                            
                                <span className="nested-camp">
                                        {profile.Departments_DepartmentsToPostulants_RDepartment.Department}
                                </span>
                            </div>
                        
                        </div>
                        <p className="text-xl text-center text-green-800 PText">{`Para solicitar información de ${profile.namePostulant +" "+ profile.lastName}, haz click en el botón de abajo`}</p>
                        <button onClick={request} className="block px-4 py-2 mx-auto font-bold text-white bg-lime-600 rounded hover:bg-lime-900">Solicitar Información</button>
                        
                        <ToastContainer>
                        </ToastContainer>
                    </div>
                </div>
                
            </div>
            
            
        </Layout>
    );
}


export async function getServerSideProps({ params,req, res }) {    
  
    //Logic to get multiple curriculum profiles to render later #SSR😎 
    const { id } = params;

    const profile = await getPostulant(id);

    const jsonProfile = JSON.stringify(profile);


    return { props:  {
                        profile:jsonProfile                    
                    } 
            }
}

export default Details;