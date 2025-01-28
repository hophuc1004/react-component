import classNames from 'classnames'
import { useState } from 'react'

const explorer = {
  id: '1',
  name: 'root',
  isFolder: true,
  items: [
    {
      id: '2',
      name: 'public',
      isFolder: true,
      items: [
        {
          id: '3',
          name: 'public nested 1',
          isFolder: true,
          items: [
            {
              id: '4',
              name: 'index.html',
              isFolder: false,
              items: []
            },
            {
              id: '5',
              name: 'hello.html',
              isFolder: false,
              items: []
            }
          ]
        },
        {
          id: '6',
          name: 'public_nested_file',
          isFolder: false,
          items: []
        }
      ]
    },
    {
      id: '7',
      name: 'src',
      isFolder: true,
      items: [
        {
          id: '8',
          name: 'App.js',
          isFolder: false,
          items: []
        },
        {
          id: '9',
          name: 'Index.js',
          isFolder: false,
          items: []
        },
        {
          id: '10',
          name: 'styles.css',
          isFolder: false,
          items: []
        }
      ]
    },
    {
      id: '11',
      name: 'package.json',
      isFolder: false,
      items: []
    }
  ]
}

export const useTraverseTree = () => {
  const insertNode = ({ tree, folderId, item, isFolder }) => {
    if (tree?.id === folderId && tree.isFolder) {
      tree?.items?.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: []
      })
      return tree
    }

    let latestNode = []

    latestNode = tree?.items?.map((ob) => {
      return insertNode({ tree: ob, folderId, item, isFolder })
    })

    return { ...tree, items: latestNode }
  }

  return {
    insertNode
  }
}

type PropsFolder = {
  explorer?: {
    items?: any
    isFolder?: boolean
    name?: string
    id?: string
  }
  handleInsertNode?: (payload: any) => any
}

// file 📄

export const Folder = ({ explorer, handleInsertNode }: PropsFolder) => {
  const [expand, setExpand] = useState(false)
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null
  })

  const handleNewFolder = (e: any, isFolder) => {
    e.stopPropagation()
    setExpand(true)

    setShowInput({
      visible: true,
      isFolder
    })
  }

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // add logic
      handleInsertNode({
        folderId: explorer?.id,
        item: e.target.value,
        isFolder: showInput?.isFolder
      })
      setShowInput({ ...showInput, visible: false })
    }
  }

  if (explorer?.isFolder) {
    return (
      <div className='mt-1'>
        <div
          className='flex items-center folder cursor-pointer mt-[6px] bg-gray-300 justify-between p-1 w-[300px]'
          onClick={() => setExpand(!expand)}
        >
          <p className=''>📁 {explorer?.name}</p>
          <div className='flex gap-2'>
            <button className='text-[16px] bg-white min-w-[64px]' onClick={(e) => handleNewFolder(e, true)}>
              Folder +
            </button>
            <button className='text-[16px] bg-white min-w-[64px]' onClick={(e) => handleNewFolder(e, false)}>
              File +
            </button>
          </div>
        </div>
        <div
          className={classNames('pl-5', {
            block: expand,
            hidden: !expand
          })}
        >
          {showInput?.visible && (
            <div className='flex items-center gap-1'>
              <span className='mt-1'>{showInput?.isFolder ? '📁' : '📄'}</span>
              <input
                onKeyDown={onAddFolder}
                className='mt-1 p-1 flex border border-gray-500 justify-center cursor-pointer'
                autoFocus
                type='text'
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer?.items?.map((exp) => {
            return <Folder explorer={exp} key={exp?.id} handleInsertNode={handleInsertNode} />
          })}
        </div>
      </div>
    )
  } else {
    return <span className='file flex flex-col mt-[5px] pl-[5px]'>📄 {explorer?.name}</span>
  }
}

const FileExplorer = () => {
  const [explorerData, setExplorerData] = useState(explorer)
  const { insertNode } = useTraverseTree()

  const handleInsertNode = ({ folderId, item, isFolder }) => {
    const finalTree = insertNode({ tree: explorerData, folderId, item, isFolder })

    setExplorerData(finalTree)
  }

  return <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />
}

export default FileExplorer
