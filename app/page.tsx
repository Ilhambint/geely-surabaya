"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Mail,
  Instagram,
  Shield,
  Zap,
  Camera,
  Smartphone,
  Volume2,
  Play,
  Download,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { VideoModal } from "@/components/video-modal";

type Language = "id";

const translations = {
  id: {
    // Navigation
    navDesign: "Desain & Eksterior",
    navInterior: "Interior & Teknologi",
    navPerformance: "Performa & Keamanan",
    navPricing: "Harga Geely EX5 MAX",
    navGallery: "Galeri",
    navTestDrive: "Jadwalkan Test Drive",

    // Hero Section
    heroTitle: "Revolusi Berkendara Telah Tiba di",
    heroSubtitle:
      "Geely EX5 Max menghadirkan sinergi antara teknologi canggih, kemewahan premium, dan performa luar biasa.",
    heroTestDrive: "Jadwalkan Test Drive",
    heroBrochure: "Unduh Brosur",

    // Design Section
    designTitle: "Memikat Setiap Pandangan",
    designSubtitle: "Desain futuristik yang memukau mata",
    newGenBattery: "New Generation Short Blade Battery",
    newGenBatteryDesc:
      "Integrasi baterai ke bodi mobil membuatnya lebih kuat, ringan, dan stabil, dengan kabin lebih lega untuk pengalaman berkendara yang lebih baik.",
    flymeSound: "Flyme Sound System",
    flymeSoundDesc:
      "Ini mengintegrasikan sel baterai ke dalam bodi kendaraan, meningkatkan kekuatan dan mengurangi bobot sekaligus menambah ruang kabin dan stabilitas untuk pengalaman berkendara yang lebih baik.",
    excellenceComfort: "Excellence in Comfort",
    excellenceComfortDesc:
      "Beradaptasi dengan gaya hidup Anda melalui fitur-fitur yang memastikan perjalanan Anda selalu nyaman, dalam segala suasana.",

    // Interior Section
    interiorTitle: "Kokpit Cerdas Anda",
    interiorSubtitle: "Kenyamanan Premium Bertemu Teknologi Intuitif",
    touchScreen: "Layar Sentuh Cerdas 15.4 inci",
    touchScreenDesc: "Pusat hiburan dan navigasi Anda",
    flymeSoundInterior: "Flyme Sound dengan 16 Speaker",
    flymeSoundInteriorDesc: "Pengalaman audio imersif di setiap perjalanan",
    camera360: "Kamera 360°",
    camera360Desc: "Parkir lebih mudah dan aman dari segala sudut",
    wirelessCharging: "Wireless Charging",
    wirelessChargingDesc: "pengisian 20%-80% hanya 20 Menit",

    // Performance Section
    performanceTitle: "Tenaga Responsif, Perlindungan Maksimal",
    performanceImpressive: "Performa Impresif",
    activeSafety: "Keamanan Aktif (ADAS)",
    engine: "Penggerak",
    power: "Tenaga",
    torque: "Torsi",
    acceleration: "Akselerasi (0-100 km/jam)",
    maxSpeed: "Kecepatan Maksimal",
    variantPro: "Varian Pro: 6,9 detik",
    variantMax: "Varian Max: 7,1 detik",

    // Pricing Section
    pricingTitle: "Harga Geely EX5 MAX",
    popular: "TERPOPULER",
    priceOtr: "Harga OTR Surabaya",
    scheduleTestDriveNow: "Jadwalkan Test Drive Sekarang",

    // Gallery Section
    galleryTitle: "Galeri & Video",
    gallerySubtitle: "Lihat Geely EX5 dari berbagai sudut",

    // Booking Section
    bookingTitle: "Ambil Kemudi. Rasakan Langsung Geely EX5.",
    bookingSubtitle:
      "Jadwalkan sesi test drive Anda di Surabaya. Tim kami siap melayani Anda di dealer atau datang langsung ke rumah/kantor Anda.",
    fullName: "Nama Lengkap",
    whatsappNumber: "Nomor WhatsApp (Wajib)",
    selectDate: "Pilih Tanggal",
    selectTime: "Pilih Jam",
    selectTimeOption: "Pilih waktu",
    morning: "Pagi (09:00-12:00)",
    afternoon: "Siang (13:00-16:00)",
    scheduleTestDrive: "JADWALKAN TEST DRIVE",
    dataSecure:
      "Tim kami akan segera menghubungi Anda melalui WhatsApp untuk konfirmasi jadwal. Data Anda 100% aman.",

    // Footer
    dealerAddress: "Geely Surabaya",
    viewOnMaps: "Lihat di Google Maps",
    contactUs: "Hubungi Kami",
    email: "Email",
    followUs: "Ikuti Kami",
    copyright: "© 2025 Geely Surabaya. Hak Cipta Dilindungi.",

    // Form Message
    formMessage: "Halo, saya ingin jadwalkan test drive Geely EX5:",
    formName: "Nama:",
    formWhatsapp: "WhatsApp:",
    formDate: "Tanggal:",
    formTime: "Waktu:",
    formThanks: "Terima kasih!",
  },
};

export default function GeelyEX5Landing() {
  const [language, setLanguage] = useState<Language>("id");
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    location: "",
    date: "",
    time: "",
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isTestTrackVideoOpen, setIsTestTrackVideoOpen] = useState(false);
  const [isExhibitionVideoOpen, setIsExhibitionVideoOpen] = useState(false);
  const [currentInteriorSlide, setCurrentInteriorSlide] = useState(0);

  // Add interior images array
  const interiorImages = [
    "/images/geely-ex5-dark.png",
    "/images/geely-ex5-silver.png",
    "/images/geely-ex5-teal.png",
    "/images/geely-ex5-white.png",
  ];
  const heroImages = [
    "/images/hero-1.png",
    "/images/hero-2.png",
    "/images/hero-3.png",
    "/images/hero-4.png",
  ];

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `${t.formMessage}
    
${t.formName} ${formData.name}
${t.formWhatsapp} ${formData.whatsapp}
${t.formDate} ${formData.date}
${t.formTime} ${formData.time}

${t.formThanks}`;

    const whatsappUrl = `https://wa.me/6281357046621?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Add this useEffect after the existing hero carousel useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInteriorSlide((prev) => (prev + 1) % interiorImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [interiorImages.length]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Video Modals */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId="UhpHXpBRrEU"
      />
      <VideoModal
        isOpen={isTestTrackVideoOpen}
        onClose={() => setIsTestTrackVideoOpen(false)}
        videoId="l1YzaUTGLLk"
      />
      <VideoModal
        isOpen={isExhibitionVideoOpen}
        onClose={() => setIsExhibitionVideoOpen(false)}
        videoId="-LNtGOCJz64"
      />

      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/images/geely-logo.png"
                alt="Geely Logo"
                width={120}
                height={60}
                className="h-14 w-auto"
              />
            </div>

            {/* Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("design")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t.navDesign}
              </button>
              <button
                onClick={() => scrollToSection("interior")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t.navInterior}
              </button>
              <button
                onClick={() => scrollToSection("performance")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t.navPerformance}
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t.navPricing}
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {t.navGallery}
              </button>
            </div>

            {/* CTA Button */}
            <div className="flex items-center">
              <Button
                onClick={() => scrollToSection("booking")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                {t.navTestDrive}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Geely EX5 Hero ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t.heroTitle} <span className="text-blue-400">Surabaya</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection("booking")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
            >
              {t.heroTestDrive}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent"
              onClick={() => {
                const downloadUrl =
                  "https://drive.google.com/uc?export=download&id=1lhNH-uevukJvh6Ro-DPanmPk95N0Tn5D";
                window.open(downloadUrl, "_blank");
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              {t.heroBrochure}
            </Button>
          </div>
        </div>
      </section>

      {/* Design & Exterior Section */}
      <section id="design" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.designTitle}
            </h2>
            <p className="text-xl text-gray-600">{t.designSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/new-generation-battery.webp"
                    alt="New Generation Short Blade Battery"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{t.newGenBattery}</h3>
                  <p className="text-gray-600">{t.newGenBatteryDesc}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/flyme-sound-system.webp"
                    alt="Flyme Sound System"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{t.flymeSound}</h3>
                  <p className="text-gray-600">{t.flymeSoundDesc}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/excellence-in-comfort.webp"
                    alt="Excellence in Comfort"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {t.excellenceComfort}
                  </h3>
                  <p className="text-gray-600">{t.excellenceComfortDesc}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interior & Technology Section */}
      <section id="interior" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t.interiorTitle}
              </h2>
              <p className="text-xl text-gray-600 mb-8">{t.interiorSubtitle}</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {t.touchScreen}
                    </h3>
                    <p className="text-gray-600">{t.touchScreenDesc}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Volume2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {t.flymeSoundInterior}
                    </h3>
                    <p className="text-gray-600">{t.flymeSoundInteriorDesc}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {t.camera360}
                    </h3>
                    <p className="text-gray-600">{t.camera360Desc}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {t.wirelessCharging}
                    </h3>
                    <p className="text-gray-600">{t.wirelessChargingDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                {interiorImages.map((image, index) => (
                  <div
                    key={index}
                    className={`transition-opacity duration-1000 ${
                      index === currentInteriorSlide
                        ? "opacity-100"
                        : "opacity-0 absolute inset-0"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Geely EX5 ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance & Safety Section */}
      <section id="performance" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.performanceTitle}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Performance Column */}
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {t.performanceImpressive}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-medium">{t.engine}</span>
                  <span className="text-blue-600 font-semibold text-sm">
                    Permanent Magnetic Synchronous Motor
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-medium">{t.power}</span>
                  <span className="text-blue-600 font-semibold">214 HP</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-medium">{t.torque}</span>
                  <span className="text-blue-600 font-semibold">320 Nm</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-medium">{t.acceleration}</span>
                  <div className="text-right">
                    <div className="text-blue-600 font-semibold text-sm">
                      {t.variantPro}
                    </div>
                    <div className="text-blue-600 font-semibold text-sm">
                      {t.variantMax}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium">{t.maxSpeed}</span>
                  <span className="text-blue-600 font-semibold">
                    175 km/jam
                  </span>
                </div>
              </div>
            </Card>

            {/* Safety Column */}
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {t.activeSafety}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm">Adaptive Cruise Control (ACC)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm">
                    Automatic Emergency Braking (AEB)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm">Lane Keeping Assist (LKA)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm">Blind Spot Detection (BSD)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm">Rear Cross Traffic Alert</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm">
                    Intelligent Cruise Control (ICC)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm">
                    Collision Mitigation Support (CMSF dan CMSR)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm">Lane Changing Assistant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm">Traffic Sign Information</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm">Doors Open Warning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm">Emergency Lane Keeping Assist</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.pricingTitle}
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center">
              <Badge className="mb-4 bg-blue-600">{t.popular}</Badge>
              <h3 className="text-2xl font-bold mb-2">Geely EX5 MAX</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">
                Rp 515.000.000
              </div>
              <p className="text-gray-600 mb-6">{t.priceOtr}</p>
              <Button
                onClick={() => scrollToSection("booking")}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {t.scheduleTestDriveNow}
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.galleryTitle}
            </h2>
            <p className="text-xl text-gray-600">{t.gallerySubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Video Item */}
            <Card
              className="group cursor-pointer overflow-hidden"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <CardContent className="p-0 relative">
                <Image
                  src="/images/geely-safety-video-thumbnail.png"
                  alt="Built for Safety: Geely EX5 Faces Extreme Safety Trials"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full bg-white/90 hover:bg-white shadow-lg"
                  >
                    <Play className="w-8 h-8 text-gray-900 ml-1" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  📹 Safety Test Video
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  3:45
                </div>
              </CardContent>
            </Card>

            {/* Test Track Video Item */}
            <Card
              className="group cursor-pointer overflow-hidden"
              onClick={() => setIsTestTrackVideoOpen(true)}
            >
              <CardContent className="p-0 relative">
                <Image
                  src="/images/test-track-video-thumbnail.jpeg"
                  alt="Geely EX5 Test Track Performance"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full bg-white/90 hover:bg-white shadow-lg"
                  >
                    <Play className="w-8 h-8 text-gray-900 ml-1" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  📹 Test Track Performance
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  4:12
                </div>
              </CardContent>
            </Card>

            {/* Exhibition Gallery Item */}
            <Card
              className="group cursor-pointer overflow-hidden"
              onClick={() => setIsExhibitionVideoOpen(true)}
            >
              <CardContent className="p-0 relative">
                <Image
                  src="/images/geely-ex5-exhibition.png"
                  alt="Geely EX5 Exhibition Display"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full bg-white/90 hover:bg-white shadow-lg"
                  >
                    <Play className="w-8 h-8 text-gray-900 ml-1" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  📹 Exhibition Display
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  2:30
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.bookingTitle}
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t.bookingSubtitle}
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    {t.fullName}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp" className="text-gray-700">
                    {t.whatsappNumber}
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    required
                    className="mt-1"
                    placeholder="08123456789"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-gray-700">
                      {t.selectDate}
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-gray-700">
                      {t.selectTime}
                    </Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) =>
                        setFormData({ ...formData, time: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t.selectTimeOption} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pagi">{t.morning}</SelectItem>
                        <SelectItem value="siang">{t.afternoon}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 text-base md:text-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t.scheduleTestDrive}
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  {t.dataSecure}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Alamat Dealer */}
            <div>
              <h3 className="text-xl font-bold mb-4">{t.dealerAddress}</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 text-blue-400 flex-shrink-0" />
                  <div>
                    <p>
                      Jl. Sulawesi No.69, Gubeng, Kec. Gubeng, Surabaya, Jawa
                      Timur 60281
                    </p>
                    <Link
                      href="#"
                      className="text-blue-400 hover:underline text-sm"
                    >
                      {t.viewOnMaps}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm">Senin - Sabtu: 08:00 - 17:00</p>
                    <p className="text-sm">Minggu: 09:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hubungi Kami */}
            <div>
              <h3 className="text-xl font-bold mb-4">{t.contactUs}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">{t.email}</p>
                    <Link
                      href="mailto:ilhambint.geely@gmail.com"
                      className="hover:text-blue-400"
                    >
                      ilhambint.geely@gmail.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Media Sosial */}
            <div>
              <h3 className="text-xl font-bold mb-4">{t.followUs}</h3>
              <div className="flex space-x-4">
                <Link
                  href="https://www.instagram.com/ilhambint.geelysurabaya/"
                  target="_blank"
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://wa.me/6281357046621?text=Hallo%2C%20saya%20tertarik%20pada%20Geely%20EX5%20Max."
                  target="_blank"
                  className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <MessageCircle className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
