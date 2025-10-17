import{ac as I,ad as w,j as t,R as k,S as x,ch as j,cl as b,aG as g,ci as u,aP as y,cx as _}from"./iframe-VCe7dRyZ.js";import{w as d,c as D}from"./ContextDecorators-BrU7DnKq.js";import{F as N,A as v}from"./FullførtStilling-0JvUI3hc.js";import{R as T}from"./GjenåpneStillingKnapp-Cnz3rgOK.js";import{T as A}from"./TilgangskontrollForInnhold-BBu07Sh6.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BU3jygdz.js";import"./OrganisasjonsnummerAlert-CvlELcV-.js";import"./VStack-DbK8sH7a.js";import"./BasePrimitive-faKREJp1.js";import"./List-CgHGulMr.js";import"./Link-91tK5V-B.js";import"./KandidatHendelseTag-DpM1tiH3.js";import"./Tag-BNZTXTla.js";import"./ChatExclamationmark-DP2zAiIS.js";import"./FileXMark-CIq7pB6D.js";import"./Trash-DyBiTSZz.js";import"./HandShakeHeart-Cq3APYaF.js";import"./Calendar-krj_m8jk.js";import"./ThumbUp-CksZbXNt.js";import"./Table-I_ka60HV.js";import"./util-Bw1HkXHV.js";import"./format-B4lXzuEg.js";import"./match-RipjgyAw.js";import"./parseISO-D6VdJANX.js";import"./parse-CUJIztkB.js";import"./getDefaultOptions-B7RZP2Z3.js";import"./util-Ca-pMBl7.js";import"./accordion-BIpVWuez.js";import"./index-CR0adLzg.js";import"./index-ADb3I-6P.js";import"./index-Cb_4nMdS.js";import"./ChevronDown-rlof1Z2Y.js";import"./Box-DqHWXVav.js";import"./Bell-D_15gySY.js";import"./PersonChat-CmgR9aqN.js";import"./Eye-CJI8ji_y.js";import"./ProgressBar-B5JlB44C.js";import"./EyeSlash-CPh3tLqb.js";import"./CircleSlash-COu6cnsy.js";import"./Modal-DFV-k5Da.js";import"./floating-ui.react-BCWccojJ.js";import"./Date.Input-BRAW8A_E.js";import"./useFormField-DDhPYMZp.js";import"./useControllableState-DrlEfUET.js";import"./Modal.context-DTzOEz2H.js";import"./Checkbox-Cxjh2f0o.js";import"./Fieldset-B2CNZGSP.js";import"./Pencil-D4fU5pXw.js";import"./PersonbrukerTekst-DGu_G4e2.js";import"./ClockDashed-DWE8A4dP.js";import"./Tasklist-CkcVClWE.js";import"./ErrorBoundary-2FM9Wqvn.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[m],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
