'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import EditSvg from "@/assets/create-outline.svg";
import Checkbox from "@/assets/checkbox-outline.svg";
import DeleteButton from './DeleteButton';
import ModalExec from './ModalExec';
import { useModalOpen } from '@/hooks/useModalOpen';

interface AccordionProps {
  id: string,
  user?: string,
  titulo?: string,
  descricao?: string,
  executado?: string
}

function Accordion(props: AccordionProps) {

  const { isOpen, handleOpen, handleClose } = useModalOpen()
  const [visible, setVisible] = useState(false)

  const handleAccordion = () => {
    visible ? setVisible(false) : setVisible(true)
    handleClose()
  }
  const handleModalExec = () => {
    handleOpen()
  }

  useEffect(() => {
  }, [isOpen])


  return (
    <main className="bg-gray-200 flex flex-col justify-center p-4 rounded-md border-b-2 border-gray-300">
      <div className="flex justify-between">
        <div className='flex gap-2 items-center w-full'>
          <button type='button' onClick={handleModalExec}><Image src={Checkbox} alt='check' width={26} /></button>
          {isOpen ? (<ModalExec id={props.id} />) : (<></>)}
          <h3 className="font-bold text-xl cursor-pointer w-full" onClick={handleAccordion}>{props.titulo}</h3>
        </div>
        <div className="flex gap-2">
          <button type="button">
            <Link href={"/editar/" + props.id}>
              <Image
                src={EditSvg}
                alt="edit"
                width={26}
                className="hover:scale-105"
              />
            </Link>
          </button>
          <DeleteButton id={props.id} />
        </div>
      </div>
      <div className=''>
        {visible && (
          <>
            <div className='text-sm font-light mt-4'>Criado por:{props.user}</div>
            {props.executado && <div className='text-sm font-light text-green-400'>Sendo executado por:{props.executado}</div>}
            <div className='text-lg font-normal'>{props.descricao}</div>
          </>
        )}
      </div>
    </main>
  )
}

export default Accordion