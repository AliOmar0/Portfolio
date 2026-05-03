import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  User,
  Cpu,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  Download,
  Sun,
  Moon,
  Monitor,
  Languages,
  Copy,
  Check,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useI18n } from "@/hooks/use-i18n";
import { projects } from "@/data/projects";

const base = import.meta.env.BASE_URL;
const TARGET_EMAIL = "alidawood098@gmail.com";

const pages = [
  { href: "/", icon: Home, key: "nav.home" as const },
  { href: "/about", icon: User, key: "nav.about" as const },
  { href: "/skills", icon: Cpu, key: "nav.skills" as const },
  { href: "/experience", icon: Briefcase, key: "nav.experience" as const },
  { href: "/projects", icon: FolderGit2, key: "nav.projects" as const },
  { href: "/education", icon: GraduationCap, key: "nav.education" as const },
  { href: "/contact", icon: Mail, key: "nav.contact" as const },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();
  const { t, toggle: toggleLocale } = useI18n();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const navigate = useCallback(
    (href: string) => {
      setLocation(href);
      close();
    },
    [setLocation, close],
  );

  const openExt = useCallback(
    (href: string) => {
      window.open(href, "_blank", "noreferrer");
      close();
    },
    [close],
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(TARGET_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[14vh] px-4 bg-background/70 backdrop-blur-md"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl"
            style={{
              background: "linear-gradient(180deg, var(--glass-bg-1), var(--glass-bg-2))",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              boxShadow: "var(--glass-shadow)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Global command menu" className="flex flex-col">
              <div className="px-4 pt-4 pb-3 border-b border-foreground/10">
                <Command.Input
                  autoFocus
                  placeholder={t("cmd.placeholder")}
                  className="w-full bg-transparent outline-none text-base text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  {t("cmd.empty")}
                </Command.Empty>

                <Command.Group heading={t("cmd.pages")} className="cmd-group">
                  {pages.map(({ href, icon: Icon, key }) => (
                    <Command.Item
                      key={href}
                      value={`${t(key)} ${href}`}
                      onSelect={() => navigate(href)}
                      className="cmd-item"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{t(key)}</span>
                      <span className="ms-auto text-[11px] text-muted-foreground font-mono">
                        {href}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading={t("cmd.projects")} className="cmd-group">
                  {projects.map((p) => (
                    <Command.Item
                      key={p.slug}
                      value={`${p.title} ${p.type}`}
                      onSelect={() => navigate(`/projects/${p.slug}`)}
                      className="cmd-item"
                    >
                      <FolderGit2 className="w-4 h-4" />
                      <span>{p.title}</span>
                      <span className="ms-auto text-[11px] text-muted-foreground">
                        {p.type}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading={t("cmd.actions")} className="cmd-group">
                  <Command.Item
                    value="open linkedin profile"
                    onSelect={() => openExt("https://www.linkedin.com/in/ali-omar0/")}
                    className="cmd-item"
                  >
                    <Linkedin className="w-4 h-4" />
                    {t("cmd.openLinkedIn")}
                  </Command.Item>
                  <Command.Item
                    value="open github profile"
                    onSelect={() => openExt("https://github.com/AliOmar0")}
                    className="cmd-item"
                  >
                    <Github className="w-4 h-4" />
                    {t("cmd.openGitHub")}
                  </Command.Item>
                  <Command.Item
                    value="download cv resume pdf"
                    onSelect={() => {
                      const a = document.createElement("a");
                      a.href = `${base}Ali_Omar_CV.pdf`;
                      a.download = "Ali_Omar_CV.pdf";
                      a.click();
                      close();
                    }}
                    className="cmd-item"
                  >
                    <Download className="w-4 h-4" />
                    {t("cmd.downloadCV")}
                  </Command.Item>
                  <Command.Item
                    value="copy email address"
                    onSelect={() => {
                      void copyEmail();
                    }}
                    className="cmd-item"
                  >
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                    {t("cmd.copyEmail")}
                    <span className="ms-auto text-[11px] text-muted-foreground">{TARGET_EMAIL}</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading={t("cmd.theme")} className="cmd-group">
                  <Command.Item
                    value="theme light"
                    onSelect={() => {
                      setTheme("light");
                      close();
                    }}
                    className="cmd-item"
                  >
                    <Sun className="w-4 h-4" />
                    Light
                    {theme === "light" && <Check className="ms-auto w-4 h-4 text-primary" />}
                  </Command.Item>
                  <Command.Item
                    value="theme dark"
                    onSelect={() => {
                      setTheme("dark");
                      close();
                    }}
                    className="cmd-item"
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                    {theme === "dark" && <Check className="ms-auto w-4 h-4 text-primary" />}
                  </Command.Item>
                  <Command.Item
                    value="theme system auto"
                    onSelect={() => {
                      setTheme("system");
                      close();
                    }}
                    className="cmd-item"
                  >
                    <Monitor className="w-4 h-4" />
                    System
                    {theme === "system" && <Check className="ms-auto w-4 h-4 text-primary" />}
                  </Command.Item>
                </Command.Group>

                <Command.Group heading={t("cmd.locale")} className="cmd-group">
                  <Command.Item
                    value="toggle language english arabic"
                    onSelect={() => {
                      toggleLocale();
                      close();
                    }}
                    className="cmd-item"
                  >
                    <Languages className="w-4 h-4" />
                    {t("cmd.toggleLocale")}
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="border-t border-foreground/10 px-3 py-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-mono">↑↓ navigate</span>
                <span className="font-mono">↵ select · esc close</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return target.isContentEditable;
}
