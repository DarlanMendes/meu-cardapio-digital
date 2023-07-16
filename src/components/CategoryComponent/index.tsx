

interface Props{
    
    name:string
    mainColor:string
    categorySelected:string
    setCategorySelected:(categoryId: string) => void;
}
export default function CategoryComponent(props:Props){
    
    return (
            <div className={`px-4 py-2 flex items-center justify-center min-w-[90px] border-black border-2 rounded-xl `}
            style={props.categorySelected=== props.name?{backgroundColor:props.mainColor, color:"white"}:{backgroundColor:'white', color:props.mainColor}}
            onClick={()=>props.setCategorySelected(props.name)}
            >
                {props.name }
            </div>
            );
}