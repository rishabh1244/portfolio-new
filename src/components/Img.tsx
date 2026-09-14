interface ImgProps {
  className?: string
  alt?: string
  src?: string
}

const Img = ({ className = '', alt = '', src = '' }: ImgProps) => (
  <img className={className} src={src} alt={alt} />
)

export default Img
