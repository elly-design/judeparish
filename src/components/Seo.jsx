import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'ACK St. Jude Miritini Parish';
const DEFAULT_DESC =
  'ACK St. Jude Miritini Parish is a vibrant Anglican church family in Miritini, Mombasa, within the ACK Diocese of Mombasa. Join us for Sunday worship, ministries, fellowship and service. All are welcome.';

const PAGE_META = {
  '/': {
    title: `${SITE_NAME} | Diocese of Mombasa, Anglican Church of Kenya`,
    description: DEFAULT_DESC
  },
  '/about': {
    title: 'About Us',
    description: `Learn the story, mission and values of ${SITE_NAME} — a Christ-centered Anglican church family in Miritini, Mombasa.`
  },
  '/about/beliefs': {
    title: 'Our Beliefs',
    description: `What we believe at ${SITE_NAME} — the core doctrines and Anglican faith foundations that shape our worship and life together.`
  },
  '/about/leadership': {
    title: 'Leadership',
    description: `Meet the vicar, staff and Parish Church Council (PCC) leading ${SITE_NAME} in Miritini, Mombasa.`
  },
  '/about/journey': {
    title: 'Our Journey',
    description: `The story and milestones of ${SITE_NAME} — how our church family has grown in faith and service in Miritini, Mombasa.`
  },
  '/ministries': {
    title: 'Our Ministries',
    description: `Explore ministries at ${SITE_NAME} — KAMA, Mothers' Union, KAYO youth, Boys' & Girls' Brigade, GFS and more. Find your place to serve.`
  },
  '/ministries/kama': {
    title: "KAMA — Men's Ministry",
    description: `Kenya Anglican Men's Association at ${SITE_NAME} — a band of men on mission, growing in faith and service.`
  },
  '/ministries/mothers-union': {
    title: "Mothers' Union",
    description: `Mothers' Union at ${SITE_NAME} — supporting marriage and family life through prayer, fellowship and service.`
  },
  '/ministries/kayo': {
    title: 'KAYO — Youth Ministry',
    description: `Kenya Anglican Youth Organisation at ${SITE_NAME} — young people growing in Christ through worship, fellowship and outreach.`
  },
  '/ministries/boys-brigade': {
    title: "Boys' & Girls' Brigade",
    description: `The Boys' & Girls' Brigade at ${SITE_NAME} — discipline, character and Christian formation for children and teens.`
  },
  '/ministries/gfs': {
    title: "Girls' Friendly Society",
    description: `Girls' Friendly Society at ${SITE_NAME} — nurturing girls in faith, friendship and service.`
  },
  '/news-updates': {
    title: 'News & Updates',
    description: `The latest stories, celebrations and announcements from ${SITE_NAME}, Miritini — services, events and ministry news.`
  },
  '/services': {
    title: 'Service Times & Weekly Programmes',
    description: `Worship with us at ${SITE_NAME} — Sunday services and weekly programmes in Miritini, Mombasa. All are welcome.`
  },
  '/gallery': {
    title: 'Gallery',
    description: `Photos from worship services, celebrations and community life at ${SITE_NAME}, Miritini, Mombasa.`
  },
  '/contact': {
    title: 'Contact Us',
    description: `Get in touch with ${SITE_NAME} — find us in Miritini, Mombasa, call or email, or send us a message. We would love to hear from you.`
  },
  '/give': {
    title: 'Give Online',
    description: `Support the mission of ${SITE_NAME} — give securely online via M-Pesa or bank transfer. Every gift makes a difference.`
  },
  '/visit': {
    title: 'Plan Your Visit',
    description: `Visiting ${SITE_NAME} for the first time? Find service times, location and what to expect in Miritini, Mombasa.`
  },
  '/baptism': {
    title: 'Baptism',
    description: `Begin your journey of faith — baptism information and application at ${SITE_NAME}, Miritini, Mombasa.`
  },
  '/connect': {
    title: 'Connect With Us',
    description: `Connect with ${SITE_NAME} — join a ministry, request prayer or get involved in our church family in Miritini, Mombasa.`
  }
};

const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = PAGE_META[pathname];
    const title = pathname === '/'
      ? PAGE_META['/'].title
      : `${meta ? meta.title : 'Page Not Found'} | ${SITE_NAME}`;
    const description = meta?.description || DEFAULT_DESC;

    document.title = title;

    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute('content', description);
  }, [pathname]);

  return null;
};

export default Seo;
