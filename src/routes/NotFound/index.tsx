import React from 'react'
import type { href } from 'react-router'

export default function NotFound() {
  return (
        <main>
            <div className='text-[#b40000] m-5 p-7'>
                <h1>Ola</h1>
            </div>
            <h2>Página não encontrada</h2>
            <p>O endereço que você tentou acessar não existe ou foi alterado</p>
            <div className='bg-[#005FCC] p-6 w-50 h-3 m-5 rounded-md'>
                <button> Voltar para o início</button>

            </div>
        </main>
    
  )
}
