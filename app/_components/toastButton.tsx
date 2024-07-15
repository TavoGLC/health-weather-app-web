"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

type ToastProps = {
    genome:string
    description:string
}

export const ToastButtonSimple = (props:ToastProps) => {
    const { toast } = useToast()
    return (
    <Button className="w-full" 
        onClick={() => {
        navigator.clipboard.writeText(props.genome)
        toast({
            variant:"destructive",
            title: "Attention",
            description: props.description,
        })}}>
            Copy Genome to Clipboard
    </Button>
    )
}

