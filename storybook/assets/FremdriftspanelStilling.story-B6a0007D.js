import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-dGv2OqX7.js";import{w as m,c as D}from"./ContextDecorators-BWRtmIde.js";import{K as b}from"./schema.zod-B3iCtGcx.js";import{u as _}from"./useKandidatlisteForEier-mceZE00T.js";import{F as y,A as N}from"./FullførtStilling-DQZjBQ31.js";import{R as T}from"./GjenåpneStillingKnapp-CEJ2nbR7.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-B7u-dpDT.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CH5HuuKx.js";import"./OrganisasjonsnummerAlert-n2dV-P-v.js";import"./VStack-CjJi4I4a.js";import"./BasePrimitive-BWtsHynz.js";import"./List-D5cAhRDP.js";import"./Link-CwO_djth.js";import"./KandidatHendelseTag-B0mmGHV7.js";import"./Tag-CgfBMYwD.js";import"./ChatExclamationmark-Bvsy52tL.js";import"./FileXMark-B6kYZGpK.js";import"./Trash-DMPYbM-l.js";import"./HandShakeHeart-Clc80Ve9.js";import"./Calendar-ZQMAGjm7.js";import"./ThumbUp-B3N30VxE.js";import"./Table-Ghjcd_Wj.js";import"./util-Dg3Yiv4F.js";import"./format-CtIKURVf.js";import"./match-DS7-xQIv.js";import"./parseISO-BhPVCY7_.js";import"./parse-v2VrHbDj.js";import"./getDefaultOptions-EcdeV_1b.js";import"./util-BvOI1xe7.js";import"./kandidat.mock-BKIiuEDI.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-BPf3e5yz.js";import"./index-jb3F0xOh.js";import"./index-oMBWOIiS.js";import"./index-BQxl1wZw.js";import"./ChevronDown-CnuRnvxx.js";import"./Box-0BaKGwdn.js";import"./Bell-Cd82rOvN.js";import"./PersonChat-DwWxZYU5.js";import"./Eye-DB6W-42u.js";import"./ProgressBar-C3tcceUC.js";import"./oppdaterStilling-Bwx9C2Gf.js";import"./EyeSlash-BEX59Jes.js";import"./CircleSlash-Ca5jcjqB.js";import"./Modal-CBWGKu2d.js";import"./floating-ui.react-C24_lbML.js";import"./Date.Input-Dx75IMGX.js";import"./useFormField-LfchmHsG.js";import"./useControllableState-QlpvQoL3.js";import"./Modal.context-BVpHri-9.js";import"./Checkbox-TnZBSnl9.js";import"./Fieldset-BIqD8aPx.js";import"./Pencil-rEVOaxW5.js";import"./PersonbrukerTekst-C8h3_f9u.js";import"./ClockDashed-B7CKEpex.js";import"./Tasklist-BsPv7PPI.js";import"./ErrorBoundary-ucZUioLN.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Pt as default};
