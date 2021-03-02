import {PacksDeleteModal} from './PacksDeleteModal/PacksDeleteModal';
import {ModalsType} from '../Modal/Modal';
import {PacksAddModal} from './PacksAddModal/PacksAddModal';
import {PacksUpdateModal} from './PacksUpdateModal/PacksUpdateModal';
import {CardPackType} from '../../../m4-dal/packs-cards-API';

type PacksModalsPropsType = {
  modal: ModalsType
  setModal: (modal: ModalsType) => void
  deletePack: () => void
  addPack: (name: string) => void
  updatePack: (name: string) => void
  pack: CardPackType
}
export const PacksModals: React.FC<PacksModalsPropsType> = (
  {modal, setModal, deletePack, addPack, updatePack, pack}) => {

  return <>
    {modal === 'delete' &&
    <PacksDeleteModal setModal={setModal}
                      deletePack={deletePack}/>}
    {modal === 'add' &&
    <PacksAddModal setModal={setModal}
                   addPack={addPack}/>}

    {modal === 'update' &&
    <PacksUpdateModal setModal={setModal}
                      updatePack={updatePack}
                      pack={pack}/>}
  </>
}