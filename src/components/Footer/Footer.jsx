import React from 'react'
import { Link } from 'react-router-dom';

const footerLinks = [
    { name: 'Help', href: '/' },
    { name: 'Status', href: '/' },
    { name: 'Writers', href: '/' },
    { name: 'Blog', href: '/' },
    { name: 'Careers', href: '/' },
    { name: 'Privacy', href: '/' },
    { name: 'Terms', href: '/' },
    { name: 'About', href: '/' },
  ];

function Footer() {
  return (
    <footer className='bg-background border-t'>
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
                {
                    footerLinks.map((link)=>(
                        <Link
                        key={link.name}
                        to={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                        {link.name}
                        </Link>
                    ))
                }
            </div>
        </div>
    </footer>
  )
}

export default Footer
