import { BookingForm } from "@/components/BookingForm";
import { InteriorsCarousel } from "@/components/InteriorsCarousel";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SiteHeader } from "@/components/SiteHeader";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import {
  careFeatures,
  customerReviews,
  facts,
  interiorSlides,
  priceRows,
  services
} from "@/data/site";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="hero" aria-label="泡泡爪宠物洗护介绍">
          <div className="hero-inner">
            <RevealOnScroll className="hero-content">
              <p className="eyebrow">犬猫洗澡 · 造型修剪 · 皮毛护理</p>
              <h1>
                <span>把每一次洗护，</span>
                <span>做成宠物愿意</span>
                <span>再来的体验。</span>
              </h1>
              <p className="hero-copy">
                独立洗护台、一宠一消毒、低噪音吹干和可视化护理记录。新客到店享基础洗护
                88 折，工作日晚间也可预约。
              </p>
              <div className="hero-actions">
                <a className="button" href="#booking">
                  预约今日档期
                </a>
                <a className="button alt" href="#pricing">
                  查看透明价格
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <div className="hero-facts" aria-label="门店亮点">
          {facts.map((fact) => (
            <RevealOnScroll className="fact" key={fact.value}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </RevealOnScroll>
          ))}
        </div>

        <section className="section compact" id="services">
          <div className="wrap">
            <RevealOnScroll className="section-head">
              <div>
                <p className="section-kicker">Services</p>
                <h2>常用洗护项目</h2>
              </div>
              <p>
                从基础清洁到造型修剪，每个项目都会先做皮肤、耳道、指甲和毛结检查，再按宠物状态调整流程。
              </p>
            </RevealOnScroll>

            <div className="service-grid">
              {services.map((service) => (
                <RevealOnScroll as="article" className="service-card" key={service.title}>
                  <img src={service.imageSrc} alt={service.imageAlt} loading="lazy" />
                  <div className="service-body">
                    <div className="tag-row">
                      {service.tags.map((tag) => (
                        <span
                          className={`tag${tag.tone && tag.tone !== "default" ? ` ${tag.tone}` : ""}`}
                          key={tag.label}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="price-line">
                      <strong>{service.price}</strong>
                      <span>{service.meta}</span>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt-band" id="care">
          <div className="wrap split">
            <RevealOnScroll className="salon-photo">
              <img
                src="https://images.pexels.com/photos/19145898/pexels-photo-19145898.jpeg?auto=compress&cs=tinysrgb&w=1100"
                alt="宠物在洗护池中接受清洁"
                loading="lazy"
              />
              <div className="salon-badge">
                <strong>先安抚，再洗护</strong>
                <span>对怕水、怕吹风和首次到店的宠物，美容师会延长适应时间，不催促完成。</span>
              </div>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="section-kicker">Care Standard</p>
              <h2>更干净，也更安心</h2>
              <ul className="feature-list">
                {careFeatures.map((feature) => (
                  <li key={feature.index}>
                    <span className="feature-icon">{feature.index}</span>
                    <div>
                      <strong>{feature.title}</strong>
                      <span>{feature.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="wrap">
            <RevealOnScroll className="section-head">
              <div>
                <p className="section-kicker">Pricing</p>
                <h2>透明价目表</h2>
              </div>
              <p>价格会根据体型、毛量、毛结和配合程度微调，到店评估后再确认，不临时加价。</p>
            </RevealOnScroll>

            <RevealOnScroll className="price-table" role="table" aria-label="宠物洗护价目表">
              <div className="price-row header" role="row">
                <strong role="columnheader">项目</strong>
                <p role="columnheader">包含内容</p>
                <span role="columnheader">起步价</span>
              </div>
              {priceRows.map((row) => (
                <div className="price-row" role="row" key={row.item}>
                  <strong role="cell">{row.item}</strong>
                  <p role="cell">{row.includes}</p>
                  <span className="price" role="cell">
                    {row.price}
                  </span>
                </div>
              ))}
            </RevealOnScroll>
          </div>
        </section>

        <section className="section alt-band interiors-section" id="interiors" aria-label="店内环境">
          <div className="wrap">
            <RevealOnScroll className="section-head">
              <div>
                <p className="section-kicker">Interiors</p>
                <h2>高端店内环境</h2>
              </div>
              <p>接待、洗护、造型三个区域独立分区，保持温暖、安静、干净的到店体验。</p>
            </RevealOnScroll>
            <InteriorsCarousel slides={interiorSlides} />
          </div>
        </section>

        <section className="section testimonials-section" id="reviews" aria-label="客户评价">
          <div className="wrap">
            <RevealOnScroll className="section-head">
              <div>
                <p className="section-kicker">Reviews</p>
                <h2>回头客怎么说</h2>
              </div>
              <p>
                这些反馈来自不同体型、不同性格的犬猫家长，重点记录他们最在意的安抚、透明沟通和护理效果。
              </p>
            </RevealOnScroll>
            <TestimonialsCarousel reviews={customerReviews} />
          </div>
        </section>

        <section className="section" id="booking">
          <div className="wrap booking-shell">
            <BookingForm />

            <RevealOnScroll as="aside" className="contact-panel">
              <div className="contact-info">
                <div className="map-caption">
                  <h3>
                    宜川路街道店 · <span className="nowrap">陕西北路 1620 号</span>
                  </h3>
                  <p>沿陕西北路到店，靠近昌平路与江宁路一带，按地图上的爪印标记即可找到门店。</p>
                </div>

                <div className="contact-list">
                  <div className="contact-item">
                    <span className="feature-icon">地</span>
                    <div>
                      <b>门店地址</b>
                      <span>上海市宜川路街道陕西北路 1620 号</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="feature-icon">时</span>
                    <div>
                      <b>营业时间</b>
                      <span>周一至周五 10:00-21:00，周末 9:30-20:30</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="feature-icon">电</span>
                    <div>
                      <b>预约电话</b>
                      <a href="tel:400-820-6620">400-820-6620</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-map">
                <img
                  className="store-map"
                  src="/assets/store-map-ai.png"
                  alt="泡泡爪宠物洗护位于上海市宜川路街道陕西北路 1620 号的 AI 手绘位置示意地图"
                  loading="lazy"
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <span>© 2026 泡泡爪宠物洗护 PawSpa Care</span>
          <span>一宠一消毒 · 透明报价 · 可视化护理记录</span>
        </div>
      </footer>
    </>
  );
}
