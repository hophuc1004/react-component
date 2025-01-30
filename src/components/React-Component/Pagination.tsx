import classNames from 'classnames'
import { useEffect, useState } from 'react'
import ArrowLeftIcon from '~/shared/icons/ArrowLeftIcon'
import ArrowRightIcon from '~/shared/icons/ArrowRightIcon'

const Pagination = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)

    const data = await res.json()

    if (data && data?.products) {
      setProducts(data?.products)
      setTotalPages(Math.floor(data?.total / 10))
    }
  }

  const selectedPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage)
    }
    return
  }

  useEffect(() => {
    fetchProducts()

    return () => {}
  }, [page])

  return (
    <div className='h-full mb-8'>
      {totalPages > 0 && (
        <div className='products grid-cols-3 gap-5 grid h-full'>
          {products?.map((prod) => {
            return (
              <div className='h-[250px] p-5 bg-gray-300 text-center rounded cursor-pointer' key={prod?.id}>
                <img
                  className='object-cover mb-1'
                  style={{ height: '95%', width: '100%' }}
                  src={prod?.thumbnail}
                  alt={prod.title}
                />
                <p>{prod?.title}</p>
              </div>
            )
          })}
        </div>
      )}
      <div className='w-full flex justify-center'>
        {totalPages > 0 && (
          <div className='pagination p-3 flex justify-between items-center'>
            {page === 1 ? null : (
              <span
                className={classNames('cursor-pointer', {
                  'opacity-0': page < 1
                })}
                onClick={() => selectedPageHandler(page - 1)}
              >
                <ArrowLeftIcon />
              </span>
            )}
            {[...Array(totalPages)]?.map((_, i) => {
              return (
                <span
                  onClick={() => selectedPageHandler(i + 1)}
                  className={classNames('p-6 border cursor-pointer', {
                    'bg-blue-500': page === i + 1
                  })}
                  key={i}
                >
                  {i + 1}
                </span>
              )
            })}
            {page >= totalPages / 10 ? null : (
              <span
                className={classNames('cursor-pointer', {
                  'opacity-0': page > totalPages / 10
                })}
                onClick={() => selectedPageHandler(page + 1)}
              >
                <ArrowRightIcon />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Pagination
