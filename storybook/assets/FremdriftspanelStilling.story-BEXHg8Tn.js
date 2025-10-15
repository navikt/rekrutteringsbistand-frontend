import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-uCi_mQk4.js";import{w as m,c as D}from"./ContextDecorators-ODaVyxTJ.js";import{K as b}from"./schema.zod-CkJYetE1.js";import{u as _}from"./useKandidatlisteForEier-CxUxZ1mS.js";import{F as y,A as N}from"./FullførtStilling-BD_Fnz2I.js";import{R as T}from"./GjenåpneStillingKnapp-CIc74tjE.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-Duv5uEGD.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-2TSOcbVy.js";import"./OrganisasjonsnummerAlert-D2ZDhlEi.js";import"./VStack-Dcwb538F.js";import"./BasePrimitive-Bsz9K4MY.js";import"./List-D_BiqU3x.js";import"./Link-CDg6BDKK.js";import"./KandidatHendelseTag-DmMWL5xZ.js";import"./Tag-D6F68oqU.js";import"./ChatExclamationmark-0MBCjqVa.js";import"./FileXMark-CVAfBa1I.js";import"./Trash-t0U_yquN.js";import"./HandShakeHeart-BX_z94qc.js";import"./Calendar-DNe2Xfpi.js";import"./ThumbUp-CFxhu4lm.js";import"./Table-taIHKPoA.js";import"./util-Tz1VMCCF.js";import"./format-C9LY8iZK.js";import"./match-ChqzxeL3.js";import"./parseISO-BkupR9xz.js";import"./parse-BgUE4KId.js";import"./getDefaultOptions-2bGULAAd.js";import"./util-BThEYQ9W.js";import"./kandidat.mock-IfF-oNjd.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-C15qqyfm.js";import"./index-CM9PJo05.js";import"./index-Cxb8qn33.js";import"./index-Ctb0YeZ4.js";import"./ChevronDown-ChWcP7RJ.js";import"./Box-Ct6WCMsY.js";import"./Bell-CtR76pBg.js";import"./PersonChat-nPzUsbFy.js";import"./Eye-CkszcKaJ.js";import"./ProgressBar-DFe7wxMM.js";import"./oppdaterStilling-DYs-EPcI.js";import"./EyeSlash-BxOhLb4W.js";import"./CircleSlash-64pzQ4PL.js";import"./Modal-DO5Ttv0-.js";import"./floating-ui.react-vq7Q8IrH.js";import"./Date.Input--CeuYuQs.js";import"./useFormField-CKp_MqU7.js";import"./useControllableState-CTHa6vAV.js";import"./Modal.context-CsE4BeM4.js";import"./Checkbox-I_3kc0FH.js";import"./Fieldset-Co2A14a_.js";import"./Pencil-BQHVDI-9.js";import"./PersonbrukerTekst-ChIlhazp.js";import"./ClockDashed-BQdc-i3I.js";import"./Tasklist-CSIuG8UP.js";import"./ErrorBoundary-BkWYuuJT.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
