import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import Layout from '@/components/Layout';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { profileData, sampleSkills } from '@/lib/data';

const Resume = () => (
  <Layout>
    <section className="py-20 md:py-32">
      <div className="container-narrow">
        <SectionHeader tag="CV" title="Resume" subtitle="My professional background and qualifications." />
        <motion.div className="p-8 rounded-xl border border-border bg-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold">{profileData.name}</h2>
            <p className="text-primary">{profileData.role}</p>
            <p className="text-muted-foreground mt-2">{profileData.email} | {profileData.phone}</p>
          </div>
          <div className="mb-8">
            <h3 className="font-display text-xl font-bold mb-4 border-b border-border pb-2">Summary</h3>
            <p className="text-muted-foreground">{profileData.bio}</p>
          </div>
          <div className="mb-8">
            <h3 className="font-display text-xl font-bold mb-4 border-b border-border pb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">{sampleSkills.slice(0, 12).map(s => <span key={s.name} className="px-3 py-1 text-sm rounded-full bg-muted">{s.name}</span>)}</div>
          </div>
          <div className="mb-8">
            <h3 className="font-display text-xl font-bold mb-4 border-b border-border pb-2">Education</h3>
            <p className="font-medium">{profileData.education}</p>
            <p className="text-sm text-muted-foreground">Information Technology</p>
          </div>
          <div className="text-center">
            <Button size="lg" className="gap-2"><Download className="w-4 h-4" />Download PDF</Button>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Resume;
