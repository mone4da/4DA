module.exports = (start, consume) => {

    let collatz = (n, consume) => {
        let generate = n => {
            consume(n)
            n > 1 && generate(n % 2 ? 3*n + 1 : n / 2)
        }

        generate(n)
    }


    let decompose = n => {
        let m = n
        let p = 0
        while(m % 2 === 0){
            m = m / 2
            p++
        }
        
        return {m,p}
    }

    collatz(start, n => consume(decompose(n)) )
}