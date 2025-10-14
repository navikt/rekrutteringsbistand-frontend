import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-BIBlb7jU.js";import{w as m,c as D}from"./ContextDecorators-DG7TdY99.js";import{K as b}from"./schema.zod-BVn2wPz4.js";import{u as _}from"./useKandidatlisteForEier-DaikUkI9.js";import{F as y,A as N}from"./FullførtStilling-D7J3saFQ.js";import{R as T}from"./GjenåpneStillingKnapp-Yc6yXw_b.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-iY6qjrT2.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-gmAv3jhr.js";import"./OrganisasjonsnummerAlert-DUbyiUeq.js";import"./VStack-UZ9RtCeW.js";import"./BasePrimitive-hRRbf9ja.js";import"./List-Crb_EZay.js";import"./Link-DtjVUng9.js";import"./KandidatHendelseTag-CyQmMP1Q.js";import"./Tag-bSqi75pu.js";import"./ChatExclamationmark-CmE2x4dW.js";import"./FileXMark-m8emJ4j5.js";import"./Trash-Bkja8DjR.js";import"./HandShakeHeart-C3gkb3XK.js";import"./Calendar-CdzV6HXg.js";import"./ThumbUp-D_YVTCCu.js";import"./Table-WCgBjGcl.js";import"./util-CAvOd24l.js";import"./format-alVTIgQr.js";import"./match--zb4cLZ5.js";import"./parseISO-Brau4hq8.js";import"./parse-Dylxks-E.js";import"./getDefaultOptions-COAmtKIT.js";import"./util-BqVd911_.js";import"./kandidat.mock-D1uM6MNI.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-yl-yyV99.js";import"./index-DFrgSryh.js";import"./index-pRwhaa0x.js";import"./index-Ctf5MRMA.js";import"./ChevronDown-DuV9F8YC.js";import"./Box-DI91JvLa.js";import"./Bell-BmKaUeJM.js";import"./PersonChat-B-_N7PX3.js";import"./Eye-Cj2ZhKY3.js";import"./ProgressBar-CJmXfyVC.js";import"./oppdaterStilling-BbqQNVuB.js";import"./EyeSlash-VvbdDE1H.js";import"./CircleSlash-IbFCpIk7.js";import"./Modal-Dpze01w3.js";import"./floating-ui.react-DEzdvJId.js";import"./Date.Input--Gl-NW01.js";import"./useFormField-DrsqqdWL.js";import"./useControllableState-AwvWBElT.js";import"./Modal.context-CHA4jJyw.js";import"./Checkbox-QUkYp7ny.js";import"./Fieldset-DcBnFKIB.js";import"./Pencil-BdSb1Hg4.js";import"./PersonbrukerTekst-CmuS91DO.js";import"./ClockDashed-B8OYrlhV.js";import"./Tasklist-xX0mvcwc.js";import"./ErrorBoundary-DmxGAF2l.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
