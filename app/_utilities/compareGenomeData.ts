function HammingDistance(vec1:number[],vec2:number[]){

    const localvec = []
    
    for (let i=0; i< vec1.length; i++){
        if(vec1[i]===vec2[i]){
            localvec.push(0)
        }
        else{
            localvec.push(1)
        }
    }
    return localvec
}

export { HammingDistance }