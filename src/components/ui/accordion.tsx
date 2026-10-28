import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "accordion-trigger-cinematic flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer text-left",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/**
 * forceMount: cevaplar kapalıyken de sunucu HTML'ine basılır — SSS içeriği
 * FAQPage JSON-LD ile eşleşsin diye.
 *
 * Kapalıyken görsel gizleme CSS'te (height:0 + overflow:hidden), erişilebilirlik
 * tarafı ise `inert` ile: kapalı cevap odaklanamaz ve ekran okuyucuya okunmaz,
 * ama DOM'da kalır. inert görünürlüğü etkilemediği için kapanma animasyonu
 * da korunur.
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, forwardedRef) => {
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  // Sunucuda ve ilk boyamada kapalı kabul edilir (Radix varsayılanı da bu).
  const [closed, setClosed] = React.useState(true);

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  // Radix açık/kapalı durumu data-state ile bildiriyor; inert'i ona göre sürüyoruz.
  React.useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const sync = () => setClosed(el.getAttribute("data-state") === "closed");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(el, { attributes: true, attributeFilter: ["data-state"] });
    return () => mo.disconnect();
  }, []);

  return (
    <AccordionPrimitive.Content
      ref={setRefs}
      forceMount
      inert={closed || undefined}
      className="accordion-content-cinematic text-sm"
      {...props}
    >
      <div className={cn("accordion-inner-cinematic pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
