function ToGenome(data:number[]){
    const letters = ['A','C','T','G','e']

    let genome = ''
    for (let i=0; i< data.length; i++) {
        if(i%10===0){
            genome = genome + ' ' +letters[data[i]]
        }
        else{
            genome = genome + letters[data[i]]
        }
    }

    return genome as string
}

export { ToGenome }