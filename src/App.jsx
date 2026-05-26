import { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas'

export default function App() {
  const [name, setName] = useState('')
  const cardRef = useRef(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlName = params.get('name')

    if (urlName) {
      setName(urlName)
    }
  }, [])

  const downloadCard = async () => {
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      scale: 3,
    })

    const link = document.createElement('a')
    link.download = 'drzakisafwa-eid-card.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const shareCard = async () => {
    const shareURL = `${window.location.origin}?name=${encodeURIComponent(name)}`

    if (navigator.share) {
      navigator.share({
        title: 'بطاقة معايدة',
        text: 'بطاقة معايدة من مجمع عيادات د. زكي',
        url: shareURL,
      })
    } else {
      navigator.clipboard.writeText(shareURL)
      alert('تم نسخ الرابط')
    }
  }

  return (
    <div className="page" dir="rtl">
      <div className="container">
        <h1>أنشئ بطاقة المعايدة</h1>

        <input
          type="text"
          placeholder="اكتب اسمك هنا..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
        />

        <div className="card-wrapper">
          <div className="card" ref={cardRef}>
            <img src="/card.png" alt="card" className="card-image" />

            <div className={`name-box ${name ? 'show' : ''}`}>
              <span>{name}</span>
            </div>
          </div>
        </div>

        <div className="buttons">
          <button className="download-btn" onClick={downloadCard}>
            تحميل البطاقة
          </button>

          <button className="share-btn" onClick={shareCard}>
            مشاركة البطاقة
          </button>
        </div>
      </div>
    </div>
  )
}
